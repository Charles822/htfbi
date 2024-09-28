import React, { useContext } from "react";
import BreadCrumbHeader from "./BreadCrumbHeader";
import { Button } from "@/components/ui/button";
import SearchHeader from "./SearchHeader";
import ProfileButton from "./ProfileButton";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import Logo from '../components/Logo';

const Header = () => {
	const { user } = useContext(AuthContext);

	return (
		<header className="flex h-14 items-center gap-4 border-b bg-background px-4">
			<Logo />
			<SearchHeader />
			{user ? (
				<ProfileButton />
			) : (
				<Link to="/login/new">
					<Button>Login</Button>
				</Link>
			)}
		</header>
	);
};

export default Header;
