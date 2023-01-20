import mongoose from "mongoose";
import { withSessionRoute } from "../../../lib/withSession";
import CategoryModel from "../../../models/category";

async function handler(req, res) {
	if (req.method === "POST") {
		try {
			await mongoose.connect(process.env.MONGODB_URL);
			const { category } = req.body;

			const { user } = req.session;

			if (!category) {
				throw new Error("Category cannot be empty");
			} else if (!user && user.type !== "admin") {
				throw new Error("Unathorized");
			}

			const alreadyExist = await CategoryModel.findOne({
				name: category,
			});

			if (alreadyExist) throw new Error("Category already exist");

			const newCategory = await CategoryModel.create({
				name: category,
				_creatorId: user.id,
			});

			// await user.save();
			res.status(200).json({
				ok: true,
				msg: "Success",
				category: newCategory,
			});
		} catch (error) {
			res.status(401).json({ ok: false, msg: error.message });
		}
	} else {
		// throw new Error("Invalid request method")
		res.status(400).json({ ok: false, msg: "invalid request method" });
	}
}

export default withSessionRoute(handler);
