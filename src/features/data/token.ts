"use server";

import { cookies } from "next/headers";
import { Tokens } from "../api/site/auth";

const setToken = async ({ accessToken, refreshToken }: Tokens) => {
  const cookiesTokens = await cookies();

  cookiesTokens.set({
    name: "accessToken",
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60,
    path: "/",
    sameSite: "strict",
  });

  if (refreshToken) {
    cookiesTokens.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "strict",
    });
  }
};

const getToken = async () => {
  try {
    const cookieStore = await cookies();
    return {
      accessToken: cookieStore.get("accessToken")?.value,
      refreshToken: cookieStore.get("refreshToken")?.value,
    };
  } catch (error) {
    console.error("Error reading cookies:", error);
    return { accessToken: undefined, refreshToken: undefined };
  }
};

const removeTokens = async () => {
  const cookiesStore = await cookies();

  cookiesStore.set({
    name: "accessToken",
    value: "",
    maxAge: -1,
    path: "/",
  });

  cookiesStore.set({
    name: "refreshToken",
    value: "",
    maxAge: -1,
    path: "/",
  });
};

export { getToken, removeTokens, setToken };
