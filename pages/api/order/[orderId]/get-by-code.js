import { withSessionRoute } from "../../../../lib/withSession";
// import CategoryModel from "../../../models/category";
import OrderModel from "../../../../models/order";
import UserModel from "../../../../models/user";

async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const { orderId } = req.query;

			// console.log(req.body);

			const { user } = req.session;

			if (!user && user.type !== "admin") {
				throw new Error("Unathorized");
			}

			if (!orderId) {
				throw new Error("Please, specify an order code");
			}

			const regex = new RegExp(orderId, "i");

			// console.log(regex);

			const orderDB = await OrderModel.find({
				code: { $regex: regex },
			}).sort({
				created_at: -1,
			});

			const order = [];

			// if (orderDB.length < 1) throw new Error("No matching order found");

			for (const item of orderDB) {
				const user = await UserModel.findById(item._userId);

				order.push({
					id: item.id,
					user: `${user.firstname} ${user.lastname}`,
					status: item.status,
					datetime: item.created_at,
					number_of_item: item.products.length,
					seen: item.seen,
				});
			}

			res.status(200).json({
				ok: true,
				msg: "Success",
				order,
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
