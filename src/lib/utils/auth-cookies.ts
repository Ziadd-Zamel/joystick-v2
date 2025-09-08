import Cookies from "js-cookie";

const USER_COOKIE_KEY = "app_user";
const TOKEN_COOKIE_KEY = "auth_token";

export const useClientCookies = () => {
  // Save user & token
  const login = (user: User) => {
    Cookies.set(USER_COOKIE_KEY, JSON.stringify(user));
    Cookies.set(TOKEN_COOKIE_KEY, user.token);
  };

  // Get user
  const getUser = (): User | null => {
    const userData = Cookies.get(USER_COOKIE_KEY);
    return userData ? (JSON.parse(userData) as User) : null;
  };

  // Get token
  const getToken = (): string | null => {
    return Cookies.get(TOKEN_COOKIE_KEY) || null;
  };

  // Remove user & token
  const logout = () => {
    Cookies.remove(USER_COOKIE_KEY);
    Cookies.remove(TOKEN_COOKIE_KEY);
  };

  // Check if user is logged in
  const isLoggedIn = (): boolean => {
    const token = getToken();
    return !!token;
  };

  return {
    login,
    getUser,
    getToken,
    logout,
    isLoggedIn,
  };
};
