import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "./session";
import mongoose from "mongoose";

// const sessionOptions = {
//   password: "complex_password_at_least_32_characters_long",
//   cookieName: "myapp_cookiename",
//   // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
//   cookieOptions: {
//     secure: process.env.NODE_ENV === "production",
//   },
// };

export function withSessionRoute(handler) {
	mongoose.connect(process.env.MONGODB_URL);
	return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr(handler) {
	mongoose.connect(process.env.MONGODB_URL);
	return withIronSessionSsr(handler, sessionOptions);
}
