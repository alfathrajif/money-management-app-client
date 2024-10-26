"use server";
import authServices from "@/services/auth";
import { IAuthLogin } from "@/types";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { AUTH_COOKIE_NAME } from "@/constants";

export async function login(payload: IAuthLogin) {
  try {
    const response = await authServices.login(payload);
    const result = response.data;

    if (result.success) {
      setAuthCookie(response);
      return result;
    }

    if (result.errors) {
      return {
        message: "Login failed",
        errors: "Invalid email or password",
        success: false,
        status_code: response.status,
      };
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const setAuthCookie = (response: Response) => {
  let setCookieHeader = response.headers.get("Set-Cookie");

  if (Array.isArray(setCookieHeader)) {
    setCookieHeader = setCookieHeader.join("; ");
  }

  if (setCookieHeader) {
    const token = setCookieHeader.split(";")[0].split("=")[1];

    cookies().set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    });
  }
};
