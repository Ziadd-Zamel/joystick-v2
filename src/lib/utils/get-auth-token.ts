import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getAuthToken(): Promise<string> {
  const tokenCookie = (await cookies()).get("next-auth.session-token")?.value;

  if (!tokenCookie) throw new Error("No session token found");
  if (!process.env.NEXTAUTH_SECRET) throw new Error("Missing NEXTAUTH_SECRET");

  const decoded = await decode({
    token: tokenCookie,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!decoded?.token) throw new Error("Failed to decode token");

  return decoded.token;
}
