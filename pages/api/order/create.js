import { withSessionRoute } from "../../../lib/withSession";
// import CategoryModel from "../../../models/category";
import OrderModel from "../../../models/order";
import FoodModel from "../../../models/food";

async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const {
				method_of_delivery,
				method_of_payment,
				address,
				reference,
				items,
				total,
			} = req.body;

			// console.log(req.body);

			const { user } = req.session;

			if (!user) {
				throw new Error("Unathorized");
			}

			if (!method_of_delivery) {
				throw new Error("Please, select a method of delivery");
			} else if (!method_of_payment) {
				throw new Error("Please, select a method of payment");
			} else if (method_of_delivery === "home" && !address) {
				throw new Error("Address cannot be empty");
			} else if (!reference) {
				throw new Error(
					"Reference error occured. Please contact admin"
				);
			} else if (!items && items.length < 1) {
				throw new Error("Cart cannot be empty");
			} else if (!total) {
				throw new Error("Math error occured. Please contact admin");
			}

			const products = items.map((i) => ({
				_productId: i.id,
				price: i.price,
				quantity: i.quantity,
			}));

			const order = await OrderModel.create({
				method_of_delivery,
				method_of_payment,
				payment_status: method_of_payment === "pay-now",
				products,
				reference,
				address,
				totalPrice: total,
				_userId: user.type === "admin" ? req.body.userId : user.id,
			});

			const code = `${user.firstname[0].toUpperCase()}${user.lastname[0].toUpperCase()}${order.id
				.slice(order.id.length - 6)
				.toUpperCase()}`;

			order.code = code;
			await order.save();

			for (const item of items) {
				await FoodModel.findByIdAndUpdate(item.id, {
					$inc: {
						number_of_item: -item.quantity,
					},
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
