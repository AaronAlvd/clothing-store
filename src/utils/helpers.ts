import type { AuthContextError } from "@/types";

export function logWebhookEvent(message: string, data: unknown | null = null): void {
	const timestamp = new Date().toISOString();
	console.log(`[${timestamp}] WEBHOOK: ${message}`, data ? JSON.stringify(data, null, 2) : "");
}

export function logAuthEvent(message: string, type = "info", error: AuthContextError = null): void {
	const timestamp = new Date().toISOString();
	if (type === "error") {
		if (error && typeof error === "object" && "message" in error) {
			console.error(`[${timestamp}] - AUTH (ERROR): ${message}`, error.message);
		} else {
			console.error(`[${timestamp}] - AUTH (ERROR): ${message}`, error);
		}
		return;
	}
	console.log(`[${timestamp}] - AUTH Provider: ${message}`);
}
