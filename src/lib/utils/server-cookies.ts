import { cookies } from "next/headers";

const USER_COOKIE_KEY = "app_user";
const TOKEN_COOKIE_KEY = "auth_token";

export async function getUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const userData = cookieStore.get(USER_COOKIE_KEY)?.value;
  return userData ? (JSON.parse(userData) as User) : null;
}

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_COOKIE_KEY)?.value || null;
}

export async function isUserLoggedin(): Promise<boolean> {
  const token = await getToken();
  return !!token;
}
