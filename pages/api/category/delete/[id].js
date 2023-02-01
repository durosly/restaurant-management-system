import { withSessionRoute } from "../../../../lib/withSession";
import CategoryModel from "../../../../models/category";
import FoodModel from "../../../../models/food";

async function handler(req, res) {
	if (req.method === "DELETE") {
		try {
			// await mongoose.connect(process.env.MONGODB_URL);
			const { id } = req.query;

			const { user } = req.session;

			if (!id) {
				throw new Error("Category cannot be empty");
			} else if (!user && user.type !== "admin") {
				throw new Error("Unathorized");
			}

			const category = await CategoryModel.findOneAndDelete({ _id: id });

			if (!category) throw new Error("Category does not exist");

			await FoodModel.updateMany({}, { $pull: { _categoriesIds: id } });

			// await user.save();
			res.status(200).json({
				ok: true,
				msg: "Success",
				category,
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
