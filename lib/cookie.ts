import cookie from "cookie";

const MAX_AGE = 10 * 24 * 60 * 60; // 10 days

export default function setCookie(res: any, token: string) {
  const setCookie = cookie.serialize("token", token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  res.setHeader("Set-Cookie", setCookie);
}

export const removeTokenCookie = (res: any) => {
  const val = cookie.serialize("token", "", {
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", val);
};
