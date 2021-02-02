import { Box, Typography } from "@material-ui/core";
import Layout from "component/Layout";
import { GetServerSidePropsContext } from "next";
import React from "react";

export type CurrentUserType =
	| {
			_id: string;
			email: string;
	  }
	| null
	| undefined;

interface HomePageProps {
	currentUser: CurrentUserType;
}

export default function Home({ currentUser }: HomePageProps) {
	console.log(currentUser);
	console.log(currentUser?.email);
	return (
		<Layout currentUser={currentUser}>
			<Box display="flex" flexDirection="column" alignItems="center">
				<Typography
					variant="h2"
					align="center"
					style={{ fontWeight: "bold", margin: "20px" }}
				>
					Home
				</Typography>

				{!currentUser && (
					<Typography
						align="center"
						style={{
							fontWeight: "bold",
							margin: "20px",
							alignSelf: "center",
						}}
					>
						you are not logged in
					</Typography>
				)}

				{currentUser && (
					<>
						<Typography
							variant="h4"
							align="center"
							style={{
								fontWeight: "bold",
								margin: "20px",
								alignSelf: "center",
							}}
						>
							you are logged in
						</Typography>
						<Typography
							align="center"
							style={{
								fontWeight: "bold",
								margin: "20px",
								alignSelf: "center",
							}}
						>
							Email: {currentUser.email}
						</Typography>
					</>
				)}
			</Box>
		</Layout>
	);
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	console.log(ctx.req.headers);
	const res = await fetch(`http://localhost:3000/api/auth/current-user`, {
		//@ts-ignore
		headers: ctx.req.headers,
	});
	const { currentUser } = await res.json();
	console.log("SERVER SIDE PROPS", currentUser);

	return {
		props: { currentUser }, // will be passed to the page component as props
	};
}
