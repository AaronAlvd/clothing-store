import type { AuthError, PostgrestError } from "@supabase/supabase-js";
import type { ReactNode } from "react";
import type { LocationType, ProcessStep } from "./constants";

/**
 * Represents the Supabase credentials a user needs
 * to log in or sign up to Supabase
 */
export type UserCredentials = {
	email: string;
	password: string;
};

/**
 * Represents the user object retrieved from Supabase
 */
export type User = {
	id: number | bigint;
	uuid: string;
	email: string;
	entity_id: number | bigint;
	first_name?: string;
	last_name?: string;
	phone?: string;
	display_name?: string;
	username?: string;
	dob?: string;
	available_tokens?: number;
	created_at: string;
	updated_at: string;
};

export type AuthContextProviderProps = {
	children: ReactNode;
};

export interface IAuthContext {
	user: User | null;
	isLoggedIn: boolean;
	signin: (email: string, password: string) => Promise<void>;
	register: (email: string, password: string) => Promise<void>;
	signout: () => void;
	error: AuthContextError;
}

export type AuthContextError = AuthError | PostgrestError | string | Error | null;

/**
 * Role type enum.
 * This should match the roleTypeEnum from your Zod schema:
 * ["owner", "author", "preserver", "receiver", "mention"]
 */
export type RoleType = "owner" | "author" | "preserver" | "receiver" | "mention";

/**
 * Legacy interfaces for join tables that are still in use.
 * We no longer have artifact_locations, so that interface is removed.
 */
export interface ArtifactEntity {
	artifact_id: number | bigint;
	entity_id: number | bigint;
	role_type?: RoleType;
	// Optionally, nested entity data if needed
}

export interface ArtifactEvent {
	artifact_id: number | bigint;
	event_id: number | bigint;
	role_type?: RoleType;
	// Optionally, nested event data if needed
}

/**
 * Updated artifactTags join table interface.
 */
export interface ArtifactTag {
	artifact_id: number | bigint;
	tag_id: number | bigint;
	// No role_type here since tag roles (if needed) are stored in the unified tag data.
}

/**
 * New interface to hold additional, flexible metadata for tags.
 */
export interface TagData {
	// Optional array of location objects
	locations?: Array<{
		type?: string; // e.g., "state", "city", "municipality", etc.
		lat?: number | null;
		lng?: number | null;
	}>;
	// Optional array of entity objects
	entities?: Array<{
		type?: string; // e.g., "person", "organization"
		given_names?: string[];
		family_names?: string[];
		other_names?: string[];
		name: string;
	}>;
	// Optional array of event objects
	events?: Array<{
		type?: string; // e.g., "created", "holiday", etc.
		start_date?: string; // ISO date string
		end_date?: string | null;
	}>;
	// Optional array of topic objects
	topics?: Array<{
		name: string;
	}>;
}

/**
 * Updated Tag interface based on the new unified tag format.
 * A tag now represents a verbatim word or phrase extracted from the transcription,
 * with additional structured metadata stored in a JSONB column.
 */
export type Tag = {
	id: number | bigint;
	name: string; // the verbatim phrase
	data: TagData; // flexible metadata for nested locations, entities, events, topics
	created_at: string;
	updated_at: string;
};

/**
 * Updated SingleArtifactResponse.
 * Legacy fields like location/locations_mentioned can be constructed from the unified tag data.
 */
export interface SingleArtifactResponse {
	created_at: string;
	expires_at: string;
	height?: number;
	id: number | bigint;
	// Legacy location field; you might remove this if it's no longer used.
	location: string | null;
	locations_mentioned: Location[]; // legacy field; consider removing if replaced by tag data
	ocr_string: string;
	origin_date: string | null;
	owner_summary?: string;
	owner_title?: string;
	path: string;
	pre_summary: string;
	pre_title: string;
	preserved_date: string;
	preservers?: User[] | User;
	processes?: Process[];
	report?: string;
	tags: Tag[]; // now uses the new unified Tag interface
	transcription: string;
	updated_at: string;
	upload_name: string;
	url: string;
	url_t?: string;
	uuid: string;
	width: number;
	// New join table associations for non-tag relationships:
}

/**
 * Updated Location interface.
 */
export type Location = {
	lat: number | null;
	lng: number | null; // updated to "lng" per your unified data
	type: LocationType;
};

/**
 * Process interface remains unchanged.
 */
export type Process = {
	created_at: string;
	id: number | bigint;
	step: ProcessStep;
	updated_at: string;
};