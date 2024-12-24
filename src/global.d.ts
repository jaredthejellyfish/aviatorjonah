export {};

declare global {
	interface CustomJWTSessionClaims {
		membership: Record<string, string>;
	}
}
