import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
	name: String,
	_categoriesIds: [String],
	images: { type: [String], default: [] },
	available: { type: Boolean, default: false },
	price: Number,
	short_summary: String,
	long_summary: String,
	created_at: { type: Date, default: Date.now },
	number_of_item: { type: Number, default: 0 },
});

const FoodModel = mongoose.models.Food || mongoose.model("Food", foodSchema);

export default FoodModel;
