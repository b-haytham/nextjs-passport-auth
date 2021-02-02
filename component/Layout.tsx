import { CurrentUserType } from "pages";
import React from "react";
import NavBar from "./NavBar";

interface Props {
	currentUser?: CurrentUserType;
}

const Layout: React.FC<Props> = ({ children, currentUser }) => {
	return (
		<>
			<NavBar currentUser={currentUser} />
			{children}
		</>
	);
};

export default Layout;
