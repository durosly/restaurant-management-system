import mongoose from "mongoose";
import { withSessionRoute } from "../../../lib/withSession";
// import CategoryModel from "../../../models/category";
import FoodModel from "../../../models/food";

async function handler(req, res) {
	if (req.method === "POST") {
		try {
			await mongoose.connect(process.env.MONGODB_URL);
			const { categories, name, short, desc, price } = req.body;

			const { user } = req.session;

			if (!user && user.type !== "admin") {
				throw new Error("Unathorized");
			}

			if (!categories || categories.length < 1) {
				throw new Error("Category cannot be empty");
			} else if (!name) {
				throw new Error("Name cannot be empty");
			} else if (!short) {
				throw new Error("Short summary cannot be empty");
			} else if (!desc) {
				throw new Error("Product description cannot be empty");
			} else if (!price) {
				throw new Error("Price cannot be empty");
			}

			const alreadyExist = await FoodModel.findOne({ name });

			if (alreadyExist) throw new Error("Food already exist");

			const newFood = await FoodModel.create({
				name,
				_categoriesIds: categories,
				price,
				short_summary: short,
				long_summary: desc,
			});

			// await user.save();
			res.status(200).json({
				ok: true,
				msg: "Success",
				food: newFood,
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
