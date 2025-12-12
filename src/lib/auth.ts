import { cookies } from "next/headers";

const COOKIE = "erp_session";

export function checkLogin(user: string, pass: string) {
  return user === process.env.ERP_USER && pass === process.env.ERP_PASS;
}

export function setSession() {
  cookies().set(COOKIE, "ok", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 12,
    sameSite: "lax",
    secure: true,
  });
}

export function requireAuth() {
  const v = cookies().get(COOKIE)?.value;
  if (v !== "ok") throw new Error("UNAUTHORIZED");
}

export function clearSession() {
  cookies().delete(COOKIE);
}
