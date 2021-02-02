import express from "express";
import next from "next";
import mongoose from "mongoose";
import session from "express-session";

const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

import passport from "./passport";

import { authRoutes } from "./routes/auth";

app.prepare().then(async () => {
	await mongoose.connect("mongodb://localhost:27017/passport", {
		useNewUrlParser: true,
		useFindAndModify: true,
		useUnifiedTopology: true,
	});
	console.log("Connected to db");

	const server = express();

	server.set("trust proxy", 1);

	server.use(express.json());

	server.use(
		session({ secret: "secret", resave: false, saveUninitialized: true })
	);

	server.use(passport.initialize());
	server.use(passport.session());

	server.use("/api/auth", authRoutes);

	server.all("*", (req, res) => {
		return handle(req, res);
	});

	server.listen(port, () => {
		console.log(`> Ready on http://localhost:${port}`);
	});
});
