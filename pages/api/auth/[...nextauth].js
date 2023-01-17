import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import UserModel from "../../../models/user";

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: "Credentials",
			callbacks: {
				async session({ session, token, user }) {
					session.accessToken = token.accessToken;
					session.user.type = token.type;
					return session;
				},
				async jwt({ token, user }) {
					if (user) {
						// token.accessToken = account.access_token;
						token.type = user.type;
					}
					return token;
				},
			},
			secret: process.env.NEXTAUTH_SECRET,
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: {
					label: "Username",
					type: "text",
					placeholder: "jsmith",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				await mongoose.connect(process.env.MONGODB_URL);
				let authorize = false;
				const user = await UserModel.findOne({
					email: credentials.email,
				});

				if (user) {
					const valid = bcrypt.compareSync(
						credentials.password,
						user.password
					);
					if (valid) authorize = true;
				}

				if (authorize) {
					// Any object returned will be saved in `user` property of the JWT
					return {
						email: user.email,
						name: `${user.firstname} ${user.lastname}`,
						type: user.type || "customer",
					};
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					// return null;
					throw new Error("Invalid credentials");

					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),
		// ...add more providers here
	],
};
export default NextAuth(authOptions);
