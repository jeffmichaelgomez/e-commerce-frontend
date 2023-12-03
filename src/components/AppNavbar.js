import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Fragment, useContext } from "react";
import logo from "../logo/logo.png";
import { FooterLink } from "./FooterStyles";
import UserContext from "../UserContext";

// AppNavbar component
export default function AppNavbar() {
	const { user } = useContext(UserContext);
	const userToken = localStorage.getItem("token");
	const userAdmin = localStorage.getItem("isAdmin");
	console.log(user.id);

	const logout = () => {
		window.location.reload(false);
	};

	return (
		<>
			<Navbar
				variant="dark"
				style={{ backgroundColor: "black" }}
			>
				<Container>
					<Navbar.Brand
						as={NavLink}
						to="/"
					>
						<img
							alt=""
							src={logo}
							width="30"
							height="30"
							className="d-inline-block align-top"
						/>{" "}
						<FooterLink>Jeffeefy</FooterLink>
					</Navbar.Brand>
					<Nav
						className="mr-auto"
						variant="light"
					>
						{user.isAdmin ? (
							<Nav.Link
								as={NavLink}
								to="/Admin"
							>
								<FooterLink>Admin</FooterLink>
							</Nav.Link>
						) : (
							<Fragment>
								<Nav.Link
									as={NavLink}
									to="/products"
								>
									<FooterLink>Products</FooterLink>
								</Nav.Link>
								<Nav.Link
									as={NavLink}
									to="/profile"
								>
									<FooterLink>Profile</FooterLink>
								</Nav.Link>
							</Fragment>
						)}
						{userToken !== null ? (
							<Fragment>
								<Nav.Link
									as={NavLink}
									to="/logout"
									onClick={logout}
									exact
								>
									<FooterLink>Logout</FooterLink>
								</Nav.Link>
							</Fragment>
						) : (
							<Fragment>
								<Nav.Link
									as={NavLink}
									to="/login"
								>
									<FooterLink>Login</FooterLink>
								</Nav.Link>
								<Nav.Link
									as={NavLink}
									to="/register"
								>
									<FooterLink>Signup</FooterLink>
								</Nav.Link>
							</Fragment>
						)}
					</Nav>
				</Container>
			</Navbar>
		</>
	);
}
