import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
	_userId: String,
	method_of_delivery: {
		type: String,
		enum: ["home", "pickup", "reserve"],
		default: "pickup",
	},
	method_of_payment: {
		type: String,
		enum: ["pay-now", "pay-cash"],
		default: "pay-now",
	},
	status: {
		type: String,
		enum: ["pending", "preparing", "delivering", "successful"],
		default: "pending",
	},
	payment_status: { type: Boolean, default: false },
	products: [
		{
			_productId: String,
			price: String,
			quantity: Number,
			hasReview: { type: Boolean, default: false },
		},
	],
	created_at: { type: Date, default: Date.now },
	address: String,
	totalPrice: Number,
	reference: String,
});

const OrderModel =
	mongoose.models.Order || mongoose.model("Order", orderSchema);

export default OrderModel;
