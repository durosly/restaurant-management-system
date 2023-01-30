import { withSessionRoute } from "../../../../../../lib/withSession";
// import CategoryModel from "../../../models/category";
import OrderModel from "../../../../../../models/order";
import RatingModel from "../../../../../../models/rating";

async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const { remark, rate } = req.body;

			const { orderId, productId } = req.query;

			// console.log(req.body);

			const { user } = req.session;

			if (!user) {
				throw new Error("Unathorized");
			}

			if (!rate) {
				throw new Error("Please, select a rating");
			} else if (!remark) {
				throw new Error("Please, give a remark");
			}

			const order = await OrderModel.findById(orderId);

			if (!order) throw new Error("Order not found");

			const productIndex = order.products.findIndex(
				(p) => p._productId === productId
			);

			if (productIndex < 0) throw new Error("Product not found");

			order.products[productIndex].hasReview = true;

			await order.save();

			const rating = await RatingModel.create({
				_productId: productId,
				_orderId: orderId,
				rating: {
					count: rate,
					remark: {
						msg: remark,
					},
				},
			});

			res.status(200).json({
				ok: true,
				msg: "Success",
				order,
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
