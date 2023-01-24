import mongoose from "mongoose";
import formidable from "formidable";
import fs from "fs";
import { withSessionRoute } from "../../../../lib/withSession";
// import CategoryModel from "../../../models/category";
import FoodModel from "../../../../models/food";

export const config = {
	api: {
		bodyParser: false,
	},
};

function uniqueFilename(filename, newFilename) {
	const fileExtension = filename.split(".").pop();
	const uniqueName = Math.random().toString(36).substring(2, 15);
	return `${newFilename}${uniqueName}.${fileExtension}`;
}

const saveFile = async (file) => {
	const newFileName = uniqueFilename(file.originalFilename, file.newFilename);
	const data = fs.readFileSync(file.filepath);
	const currentDir = process.cwd();
	// console.log(currentDir);

	const uploadPath = `${currentDir}/public/products/${newFileName}`;

	// console.log(uploadPath);

	fs.writeFileSync(uploadPath, data);
	await fs.unlinkSync(file.filepath);
	return newFileName;
};

async function handler(req, res) {
	if (req.method === "POST") {
		try {
			await mongoose.connect(process.env.MONGODB_URL);
			// const { categories, name, short, desc, price } = req.body;

			const { user } = req.session;
			const productId = req.query.id;

			if (!user && user.type !== "admin") {
				throw new Error("Unathorized");
			}

			// const form = new formidable.IncomingForm();

			const fData = await new Promise((resolve, reject) => {
				const form = new formidable.IncomingForm();
				form.parse(req, (err, fields, files) => {
					if (err) return reject(err);
					resolve({ fields, files });
				});
			});

			// console.log(productId);

			const files = [];

			for (const img in fData.files) {
				const file = fData.files[img];
				const filename = await saveFile(file);

				await FoodModel.findByIdAndUpdate(productId, {
					$addToSet: { images: filename },
				});
				files.push(filename);
				// console.log(file);
			}

			res.status(200).json({ ok: true, msg: "nice", files });
		} catch (error) {
			res.status(401).json({ ok: false, msg: error.message });
		}
	} else {
		// throw new Error("Invalid request method")
		res.status(400).json({ ok: false, msg: "invalid request method" });
	}
}

export default withSessionRoute(handler);
