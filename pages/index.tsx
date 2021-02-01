import { Box, Typography } from "@material-ui/core";
import Layout from "component/Layout";
import { GetServerSidePropsContext } from "next";
import React from "react";

export type CurrentUserType = {
	_id: string;
	email: string;
} | null;

interface HomePageProps {
	currentUser: CurrentUserType;
}

export default function Home({ currentUser }: HomePageProps) {
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
						// @ts-ignore
						variant="p"
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
							// @ts-ignore
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
							// @ts-ignore
							variant="p"
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

export async function getServerSideProps(_: GetServerSidePropsContext) {
	const res = await fetch(`http://localhost:3000/api/auth/current-user`);
	const data = await res.json();
	console.log(data);

	return {
		props: { data }, // will be passed to the page component as props
	};
}
