import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "./session";

// const sessionOptions = {
//   password: "complex_password_at_least_32_characters_long",
//   cookieName: "myapp_cookiename",
//   // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
//   cookieOptions: {
//     secure: process.env.NODE_ENV === "production",
//   },
// };

export function withSessionRoute(handler) {
	return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr(handler) {
	return withIronSessionSsr(handler, sessionOptions);
}
