import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
	_productId: String,
	_orderId: String,
	rating: {
		count: Number,
		remark: {
			msg: String,
			created_at: { type: Date, default: Date.now },
		},
		reply: {
			msg: String,
			created_at: { type: Date, default: Date.now },
		},
	},

	created_at: { type: Date, default: Date.now },
});

const RatingModel =
	mongoose.models.Rating || mongoose.model("Rating", ratingSchema);

export default RatingModel;
