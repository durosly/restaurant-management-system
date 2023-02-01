import { withSessionRoute } from "../../../../lib/withSession";
// import CategoryModel from "../../../models/category";
import OrderModel from "../../../../models/order";
import UserModel from "../../../../models/user";

async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const { orderId } = req.query;

			const { user } = req.session;

			if (!user) {
				throw new Error("Unathorized");
			}

			const order = await OrderModel.findById(orderId);

			if (!order) throw new Error("Order not found");

			const customer = await UserModel.findById(order._userId);

			res.status(200).json({
				ok: true,
				msg: "Success",
				order,
				customer,
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
