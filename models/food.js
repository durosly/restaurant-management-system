import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
	name: String,
	_categoriesIds: [String],
	images: [String],
	available: Boolean,
	price: Number,
	short_summary: String,
	long_summary: String,
	created_at: { type: Date, default: Date.now },
});

const FoodModel = mongoose.models.Food || mongoose.model("Food", foodSchema);

export default FoodModel;
