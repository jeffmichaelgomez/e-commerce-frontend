import React from "react";
import { Container, Col, Button, Form } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { useHistory, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import "../App.css";

export default function Login(props) {
	const userToken = localStorage.getItem("token");
	const { user, setUser } = useContext(UserContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isActive, setIsActive] = useState(false);

	let history = useHistory();

	function registerUser(e) {
		e.preventDefault();
		fetch("https://frozen-fjord-80490.herokuapp.com/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (typeof data.access !== "undefined") {
					localStorage.setItem("token", data.access);
					retrieveUserDetails(data.access);
					Swal.fire({
						title: "Login Successful",
						icon: "success",
						text: "Welcome to Jeffeefy",
					});
				} else {
					Swal.fire({
						title: "Authentication failed",
						icon: "error",
						text: "Check your login details and try again.",
					});
				}
			});

		// Set the email of the authenticated user in the local storage
		// Syntax: localStorage.setItem('propertyName', value);

		// Clear input fields after submission
		setEmail("");
		setPassword("");
	}

	const retrieveUserDetails = (token) => {
		fetch("https://frozen-fjord-80490.herokuapp.com/details", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setUser({
					id: data._id,
					isAdmin: data.isAdmin,
				});
			});
	};

	useEffect(() => {
		// Validation to enable submit button when all fields are populated and both passwords match
		if (email !== "" && password !== "") {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [email, password]);
	return user.isAdmin ? (
		<Redirect to="/admin" />
	) : userToken !== null ? (
		<Redirect to="/products" />
	) : (
		<div className="loginForm">
			<Container
				fluid="lg"
				className="d-flex justify-content-center"
				style={{ minHeight: "679px", color: "white" }}
			>
				<Form onSubmit={(e) => registerUser(e)}>
					<Col className="mb-2 mt-5">
						<Form.Label>
							<h2>Login</h2>
						</Form.Label>
					</Col>
					<Col className="mb-3">
						<Form.Group
							className="mb-1"
							controlId="userEmail"
							xs={12}
							md={6}
							lg={4}
						>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								column
								lg="2"
								type="email"
								placeholder="Enter Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							<Form.Label>
								We'll never share your email with anyone else.
							</Form.Label>
						</Form.Group>
					</Col>
					<Col className="mb-3">
						<Form.Group
							className="mb-1"
							controlId="password"
						>
							<Form.Label>Password</Form.Label>
							<Form.Control
								column
								lg="2"
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</Form.Group>
					</Col>
					<div className="mb-3">
						<span>
							Dont have an Account yet?{" "}
							<Link
								to="/register"
								exact
							>
								Register
							</Link>
						</span>
					</div>
					<Col>
						<div className="d-flex justify-content-center mb-3 mt-4">
							{isActive ? (
								<Button
									variant="primary"
									type="submit"
									id="submitBtn"
									style={{ borderRadius: 20 }}
									className="px-4"
								>
									Submit
								</Button>
							) : (
								<Button
									variant="dark"
									type="submit"
									id="submitBtn"
									style={{ borderRadius: 20 }}
									className="px-4"
									disabled
								>
									Submit
								</Button>
							)}
						</div>
					</Col>
				</Form>
			</Container>
		</div>
	);
}
