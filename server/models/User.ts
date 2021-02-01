import mongoose from "mongoose";

interface UserAttr {
	email: string;
	password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttr): UserDoc;
}

interface UserDoc extends mongoose.Document {
	email: string;
	password: string;
}

const userSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{
		timestamps: true,
		toJSON: {
			transform(_, ret) {
				delete ret.password;
			},
		},
	}
);

userSchema.statics.build = (attrs: UserAttr) => {
	return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export default User;
