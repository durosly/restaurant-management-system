import mongoose from "mongoose";
import { withSessionRoute } from "../../../../lib/withSession";
// import CategoryModel from "../../../models/category";
import FoodModel from "../../../../models/food";

async function handler(req, res) {
	if (req.method === "PUT") {
		try {
			await mongoose.connect(process.env.MONGODB_URL);

			const { user } = req.session;
			const productId = req.query.id;

			if (!user && user.type !== "admin") {
				throw new Error("Unathorized");
			}

			// console.log(req.body);
			await FoodModel.findByIdAndUpdate(productId, {
				...req.body,
			});

			res.status(200).json({ ok: true, msg: "update successful" });
		} catch (error) {
			res.status(401).json({ ok: false, msg: error.message });
		}
	} else {
		// throw new Error("Invalid request method")
		res.status(400).json({ ok: false, msg: "invalid request method" });
	}
}

export default withSessionRoute(handler);
