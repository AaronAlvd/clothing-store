"use client";

import { login, signup } from "@/actions/auth";
import { supabase } from "@/config/supabase";
import type { AuthContextError, AuthContextProviderProps, IAuthContext, User } from "@/types";
import { logAuthEvent } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import type React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
// import type { AuthError, PostgrestError } from "@supabase/supabase-js";

/*
    Context provider to manage auth state across the app
    This will be used to check if the user is logged in and provide access to the user object throughout the app

    How to use:
    import { useAuth } from "@/context/AuthContext";
    const { user, isLoggedIn, error } = useAuth();
*/

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = (props) => {
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [error, setError] = useState<AuthContextError>(null);

	const getUser = async () => {
		try {
			const {
				data: { user: userData },
				error: fetchError,
			} = await supabase.auth.getUser();

			if (fetchError || !userData) {
				logAuthEvent("Couldn't get currently logged in user", "info", fetchError);
				setUser(null);
				setIsLoggedIn(false);
				return;
			}

			logAuthEvent("User logged in...getting user data", "info");

			const existingUser = await getExistingUserFromDatabase(userData.id);
			if (existingUser) {
				setUser(existingUser);
				setIsLoggedIn(true);
			}
		} catch (err) {
			logAuthEvent("Error getting authenticated user information", "error", err as AuthContextError);
			setError(err as AuthContextError);
		}
	};

	useEffect(() => {
		getUser();

		const { data: subscription } = supabase.auth.onAuthStateChange(async (event, session) => {
			logAuthEvent(`Auth state changed - ${event}`, "info");
			if (session?.user) {
				getUser();
			} else {
				setUser(null);
				setIsLoggedIn(false);
			}
		});

		return () => {
			subscription?.subscription.unsubscribe();
		};
	}, []);

	const signin = async (email: string, password: string): Promise<void> => {
		try {
			const response = await login(email, password);
			if (response?.error) {
				throw new Error(response.error);
			}
			await getUser();
			router.push("/map");
		} catch (err) {
			logAuthEvent("Error logging in", "error", err as AuthContextError);
			setError(err as AuthContextError);
			throw err;
		}
	};

	const register = async (email: string, password: string): Promise<void> => {
		try {
			logAuthEvent("Attempting to sign user up", "info");
			await signup(email, password);
		} catch (err) {
			logAuthEvent("Error signing up", "error", err as AuthContextError);
			setError(err as AuthContextError);
		}
	};

	const signout = async (): Promise<void> => {
		try {
			logAuthEvent("Signing user out", "info");
			const { error: signOutError } = await supabase.auth.signOut();
			if (signOutError) {
				throw signOutError;
			}
			setUser(null);
			setIsLoggedIn(false);
			router.push("/");
		} catch (err) {
			logAuthEvent("Error Signing user out", "error", err as AuthContextError);
			setError(err as AuthContextError);
		}
	};

	// Prevent unneccessary rerenders
	const authValues = useMemo<IAuthContext>(() => {
		return {
			user,
			isLoggedIn,
			register,
			signin,
			signout,
			error,
		};
	}, [isLoggedIn, user, error]);

	return <AuthContext.Provider value={authValues}>{props.children}</AuthContext.Provider>;
};

export const useAuth = (): IAuthContext => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthContextProvider");
	}
	return context;
};

async function getExistingUserFromDatabase(userId: string): Promise<User | null> {
	const { data: user, error } = await supabase.from("users").select("*").eq("id", userId).single();
	logAuthEvent("User successfully fetched from database", "info");
	if (error) {
		logAuthEvent("Error fetching user from database", "error", error);
		return null;
	}

	return user;
}
