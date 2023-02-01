import { withSessionRoute } from "../../../../lib/withSession";
// import CategoryModel from "../../../models/category";
import OrderModel from "../../../../models/order";

async function handler(req, res) {
	if (req.method === "PUT") {
		try {
			const { status } = req.body;
			const { orderId } = req.query;

			// console.log(req.body);

			const { user } = req.session;

			if (!user && user.type !== "admin") {
				throw new Error("Unathorized");
			}

			if (!status) {
				throw new Error("Please, select a new order status");
			} else if (!orderId) {
				throw new Error("Please, specify an order");
			}

			await OrderModel.findByIdAndUpdate(orderId, { status });

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
