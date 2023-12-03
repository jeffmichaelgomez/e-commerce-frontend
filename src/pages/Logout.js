import { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../UserContext";
import { Fragment } from "react";

export default function Logout() {
	const { unsetUser, setUser } = useContext(UserContext);

	unsetUser();

	useEffect(() => {
		setUser({
			id: null,
			isAdmin: null,
		});
	});

	// Redirect back to login
	return (
		<Fragment>
			<Redirect to="/products" />
		</Fragment>
	);
}
