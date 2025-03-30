"use client";

import { supabase } from "@/config/supabase"

export async function login(email: string, password: string) {
	const { error } = await supabase.auth.signInWithPassword({ email, password });

	if (error) {
		return { error: error.message };
	}

	return { success: true };
}

export async function signup(email: string, password: string) {
	const { error } = await supabase.auth.signUp({ email, password });

	if (error) {
		console.error("Signup error:", error);
		return { error: error.message };
	}

	return { success: true };
}
