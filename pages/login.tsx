import { Box, Button, Input, InputLabel, Typography } from "@material-ui/core";
import Layout from "component/Layout";
import React, { useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";

interface Props {}

export default function login({}: Props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const router = useRouter();

	const submitHandler = async () => {
		try {
			const response = await axios.post("/api/auth/login", {
				email,
				password,
			});
			console.log(response);
			if (response.status === 200) {
				router.push("/");
			}
		} catch (error) {
			console.log(error);
			alert("Error sign up");
		}
	};

	return (
		<Layout>
			<Box display="flex" flexDirection="column" alignItems="center">
				<Typography
					variant="h2"
					align="center"
					style={{ fontWeight: "bold", margin: "20px" }}
				>
					Login
				</Typography>

				<Box
					display="flex"
					flexDirection="column"
					style={{ margin: "30px 0" }}
				>
					<InputLabel htmlFor="my-input">Email address</InputLabel>
					<Input
						style={{ margin: "15px 0" }}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						id="my-input"
						aria-describedby="my-helper-text"
					/>

					<InputLabel htmlFor="my-pass">Password</InputLabel>
					<Input
						type="password"
						style={{ margin: "15px 0" }}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						id="my-pass"
						aria-describedby="my-helper-text-pass"
					/>
					<Button
						variant="outlined"
						color="primary"
						onClick={submitHandler}
					>
						Submit
					</Button>
				</Box>
			</Box>
		</Layout>
	);
}
