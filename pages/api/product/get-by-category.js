import mongoose from "mongoose";
import { withSessionRoute } from "../../../lib/withSession";
// import CategoryModel from "../../../models/category";
import FoodModel from "../../../models/food";

async function handler(req, res) {
	if (req.method === "GET") {
		try {
			await mongoose.connect(process.env.MONGODB_URL);
			// const { categories, name, short, desc, price } = req.body;

			// const { user } = req.session;

			// if (!user) {
			// 	throw new Error("Unathorized");
			// }

			const categoryId = req.query.category || null;

			console.log(categoryId);
			console.log(req.query);

			const query =
				categoryId !== null
					? {
							_categoriesIds: categoryId,
							available: true,
					  }
					: { available: true };

			// console.log(query, "query");

			const products = await FoodModel.find(query);
			// const categories = await CategoryModel.find({});

			// await user.save();
			res.status(200).json({
				ok: true,
				msg: "Success",
				products,
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
