export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const ENV = process.env.NODE_ENV;
export const AUTH_COOKIE_NAME = process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME || "";

export const unauthenticatedRoutes = [
  {
    title: "Login",
    path: "/login",
  },
  {
    title: "Signup",
    path: "/sign-up",
  },
];
