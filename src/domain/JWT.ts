import { JWT, decode } from 'next-auth/jwt';
import { env } from "src/env/server.mjs";


export async function getJWTSession(sessionToken: string): Promise<JWT> {
	const decoded = await decode({
		token: sessionToken,
		secret: env.NEXTAUTH_SECRET!,
	});
	if (!decoded) throw new Error("Invalid session token");
	return decoded;
}