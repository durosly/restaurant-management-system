import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
	firstname: String,
	middlename: String,
	lastname: String,
	email: String,
	password: String,
	is_admin: { type: Boolean, default: false },
	type: {
		type: String,
		enum: ["admin", "customer"],
		default: "customer",
	},
});

// userSchema.plugin(bcrypt())
userSchema.pre("save", function (next) {
	const user = this;

	if (!user.isModified("password")) return next();

	// generate a salt
	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);

		// hash the password using our new salt
		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);
			// override the cleartext password with the hashed one
			user.password = hash;
			next();
		});
	});
});

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
