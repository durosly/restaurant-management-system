import { withSessionRoute } from "../../../../lib/withSession";
// import CategoryModel from "../../../models/category";
import RatingModel from "../../../../models/rating";

async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const { msg } = req.body;
			const { id } = req.query;

			// console.log(req.body);

			const { user } = req.session;

			if (!user && user.type !== "admin") {
				throw new Error("Unathorized");
			}

			if (!msg) {
				throw new Error("Please, enter reply message");
			} else if (!id) {
				throw new Error("Please, specify an order");
			}

			await RatingModel.findByIdAndUpdate(id, {
				$set: { "rating.reply.msg": msg, created_at: Date.now() },
			});

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
