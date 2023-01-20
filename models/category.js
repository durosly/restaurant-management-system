import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
	name: String,
	_creatorId: String,
	created_at: { type: Date, default: Date.now },
});

const CategoryModel =
	mongoose.models.Category || mongoose.model("Category", categorySchema);

export default CategoryModel;
