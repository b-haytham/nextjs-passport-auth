import React, { ReactElement } from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { CurrentUserType } from "pages";

interface Props {
	currentUser: CurrentUserType;
}

const useStyles = makeStyles((_) => ({
	root: {
		flexGrow: 1,
	},

	title: {
		flexGrow: 1,
	},
	link: {
		color: "white",
		fontWeight: "bold",
		textDecoration: "none",
		margin: "0 20px",
	},
}));

function NavBar({ currentUser }: Props): ReactElement {
	const classes = useStyles();
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" className={classes.title}>
					Nextjs passport authentication
				</Typography>
				{/* @ts-ignore */}
				{!currentUser && (
					<>
						<Link href="/register">
							<a className={classes.link}>Register</a>
						</Link>
						<Link href="/register">
							<a className={classes.link}>Login</a>
						</Link>
					</>
				)}
				{currentUser && (
					<Link href="/register">
						<a className={classes.link}>Logout</a>
					</Link>
				)}
			</Toolbar>
		</AppBar>
	);
}

export default NavBar;
