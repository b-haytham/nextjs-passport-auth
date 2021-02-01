import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "./models/User";

passport.serializeUser((user, done) => {
	//@ts-ignore
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	User.findById(id, (err: any, user: any) => {
		done(err, user);
	});
});

passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
		},
		async (email, password, done) => {
			const existingUser = await User.findOne({ email });

			const hashedPassword = await bcrypt.hash(password, 8);

			if (!existingUser) {
				const newUser = User.build({ email, password: hashedPassword });
				try {
					await newUser.save();
					return done(null, newUser);
				} catch (error) {
					console.log(error);
					return done(null, false, { message: error.message });
				}
			} else {
				const isMatch = await bcrypt.compare(
					password,
					existingUser.password
				);
				if (isMatch) {
					return done(null, existingUser);
				} else {
					return done(null, false, { message: "Wrong Credentials" });
				}
			}
		}
	)
);

export default passport;
