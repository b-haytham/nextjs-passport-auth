import { Router } from "express";
import passport from "../passport";

const router = Router();

router.post("/register", passport.authenticate("local"), (req, res) => {
	//@ts-ignore
	if (req.user) delete req.user.password;

	res.status(201).send({ user: req.user });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
	//@ts-ignore
	if (req.user) delete req.user.password;

	res.status(200).send({ user: req.user });
});
router.post("/logout", (req, res, _) => {
	req.session.destroy(() => {
		req.logout();
		res.status(200).send({});
	});
});
router.get("/current-user", (req, res, _) => {
	const isAuth = req.isAuthenticated();

	if (!isAuth) return res.status(200).send({ currentUser: null });

	res.status(200).json({ currentUser: req.user });
});

export { router as authRoutes };
