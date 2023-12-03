import { Container, Card, Col, Button, Form } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { useHistory, Redirect } from 'react-router-dom';
import UserContext from '../UserContext';
import { Link } from 'react-router-dom';
import '../App.css';

export default function Register() {
	const userToken = localStorage.getItem('token');
	const { user } = useContext(UserContext);
	const [email, setEmail] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');
	const [isActive, setIsActive] = useState(false);
	const [fullName, setFullName] = useState('');
	const [address, setAddress] = useState('');
	let history = useHistory();

	function registerUser(e) {
		e.preventDefault();
		fetch('https://cyan-weary-whale.cyclic.app/checkEmail', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data === false) {
					fetch('https://cyan-weary-whale.cyclic.app/register', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							name: fullName,
							email: email,
							address: address,
							password: password1,
						}),
					})
						.then((res) => res.json())
						.then((data) => {
							Swal.fire({
								title: 'Registration Successful',
								icon: 'success',
								text: 'Welcome to Zuitt',
							});
							history.push('/login');
						});
				} else {
					Swal.fire({
						title: 'Duplicate email found',
						icon: 'error',
						text: 'Please provide different email',
					});
				}
			});

		setEmail('');
		setPassword2('');
		setPassword1('');
		setFullName('');
		setAddress('');
	}

	useEffect(() => {
		if (
			fullName !== '' &&
			address !== '' &&
			password1 !== '' &&
			password2 !== '' &&
			password1 === password2
		) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [fullName, address, email, password1, password2]);

	return userToken !== null ? (
		<Redirect to="/products" />
	) : (
		<div className="loginForm">
			<Container
				fluid="lg"
				className="d-flex justify-content-center"
				style={{ minHeight: '679px', color: 'white' }}
			>
				<Form onSubmit={(e) => registerUser(e)}>
					<Col>
						<Form.Label className="mt-5">
							<h2>Register</h2>
						</Form.Label>
					</Col>
					<Col className="mt-1">
						<Form.Group
							className="mb-1"
							controlId="fullName"
						>
							<Form.Label>Full Name</Form.Label>
							<Form.Control
								column
								lg="2"
								type="text"
								placeholder="Enter 
				    Full Name"
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
								required
							/>
						</Form.Group>
					</Col>
					<Col className="mt-1">
						<Form.Group
							className="mb-1"
							controlId="address"
						>
							<Form.Label>Address</Form.Label>
							<Form.Control
								column
								lg="2"
								type="text"
								placeholder="Enter Full Address"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								required
							/>
							<Form.Text className="text-muted">
								Street, Subdivision ,Barangay ,City ,Province
							</Form.Text>
						</Form.Group>
					</Col>
					<Col className="mt-1">
						<Form.Group
							className="mb-1"
							controlId="userEmail"
						>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								column
								lg="2"
								type="email"
								placeholder="Enter 
				    Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							<Form.Text>
								We'll never share your email with anyone else.
							</Form.Text>
						</Form.Group>
					</Col>
					<Col className="mt-1">
						<Form.Group
							className="mb-1"
							controlId="password1"
						>
							<Form.Label>Password</Form.Label>
							<Form.Control
								column
								lg="2"
								type="password"
								placeholder="Password"
								value={password1}
								onChange={(e) => setPassword1(e.target.value)}
								required
							/>
						</Form.Group>
					</Col>
					<Col className="mt-1">
						<Form.Group
							className="mb-3"
							controlId="password2"
						>
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								column
								lg="2"
								type="password"
								placeholder="Password"
								value={password2}
								onChange={(e) => setPassword2(e.target.value)}
								required
							/>
						</Form.Group>
					</Col>
					<p>
						Already a member? <Link to="/login">Login Here</Link>
					</p>
					<Col className="d-flex justify-content-center">
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
					</Col>
				</Form>
			</Container>
		</div>
	);
}
