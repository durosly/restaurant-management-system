// import { withIronSessionApiRoute } from "iron-session/next";
import bcrypt from "bcryptjs";
// import mongoose from "mongoose";
// import { sessionOptions } from "../../../lib/session";
import { withSessionRoute } from "../../../lib/withSession";
import UserModel from "../../../models/user";

// export default withIronSessionApiRoute(loginRoute, sessionOptions);
export default withSessionRoute(loginRoute);

async function loginRoute(req, res) {
	try {
		// mongoose.connect(process.env.MONGODB_URL);
		// get user from database then:

		const { email, password } = req.body;

		const user = await UserModel.findOne({ email });

		if (!user) throw new Error("Invalid credentials");

		const compare = await bcrypt.compare(password, user.password);

		if (!compare) throw new Error("Invalid credentials");

		req.session.user = {
			id: user._id,
			type: user.type,
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email,
		};
		await req.session.save();
		res.send({ ok: true });
	} catch (error) {
		res.status(400).send({ ok: false, message: error.message });
	}
}
