import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import { withSessionRoute } from "../../../../lib/withSession";
// import CategoryModel from "../../../models/category";
import FoodModel from "../../../../models/food";

async function handler(req, res) {
	if (req.method === "DELETE") {
		try {
			await mongoose.connect(process.env.MONGODB_URL);
			const img = req.body;

			const { user } = req.session;

			if (!user && user.type !== "admin") {
				throw new Error("Unathorized");
			}

			console.log(img);

			const productId = req.query.id;

			await FoodModel.findByIdAndUpdate(productId, {
				$pull: { images: img },
			});

			// await user.save();
			const currentDir = process.cwd();
			// console.log(currentDir);

			const uploadPath = `${currentDir}/public/products/${img}`;

			// console.log(uploadPath);

			fs.unlinkSync(uploadPath);

			res.status(200).json({
				ok: true,
				msg: "Success",
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
