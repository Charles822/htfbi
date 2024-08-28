import React, { useContext } from "react";
import BreadCrumbHeader from "./BreadCrumbHeader";
import { Button } from "@/components/ui/button";
import SearchHeader from "./SearchHeader";
import ProfileButton from "./ProfileButton";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
	const { user } = useContext(AuthContext);

	return (
		<header className="flex h-14 items-center gap-4 border-b bg-background px-4">
			<SearchHeader />
			{user ? (
				<ProfileButton />
			) : (
				<Button>{<Link to="/login/new">Login</Link>}</Button>
			)}
		</header>
	);
};

export default Header;
