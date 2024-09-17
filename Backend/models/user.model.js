import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		email: { type: String, unique: true },
		password: String,
		name: String,
		isVerified: { type: Boolean, default: false },
		lastLogin: { type: Date, default: Date.now },

		resetPasswordToken: String,
		resetPasswordExpiresAt: Date,
		verificationToken: String,
		verificationTokenExpiresAt: Date,
	},
	{ timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);

/** mongoose.models.User checks if a model named "User" already exists. If it does, it uses that existing model.
If the model does not already exist, mongoose.model("User", userSchema) creates a new model with the name "User" and the specified schema.
*/