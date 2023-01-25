import mongoose from "mongoose";
import { withSessionRoute } from "../../../../lib/withSession";
import CategoryModel from "../../../../models/category";
import FoodModel from "../../../../models/food";

async function handler(req, res) {
	if (req.method === "GET") {
		try {
			await mongoose.connect(process.env.MONGODB_URL);
			// const { categories, name, short, desc, price } = req.body;

			const { user } = req.session;

			if (!user) {
				throw new Error("Unathorized");
			}

			const productId = req.query.id;

			const product = await FoodModel.findById(productId, ["-images"]);
			const categories = await CategoryModel.find({});

			// await user.save();
			res.status(200).json({
				ok: true,
				msg: "Success",
				product,
				categories,
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
