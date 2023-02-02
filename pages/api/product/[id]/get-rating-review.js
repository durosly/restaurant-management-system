import { withSessionRoute } from "../../../../lib/withSession";
import RatingModel from "../../../../models/rating";

async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const { user } = req.session;

			if (!user) {
				throw new Error("Unathorized");
			}

			const productId = req.query.id;

			const ratingDB = await RatingModel.find({ _productId: productId });

			const total = ratingDB.reduce(
				(prev, curr) => prev + curr.rating.count,
				0
			);
			const rating = (total / ratingDB.length).toFixed(1);

			// await user.save();
			res.status(200).json({
				ok: true,
				msg: "Success",
				reviews: ratingDB,
				rating,
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
