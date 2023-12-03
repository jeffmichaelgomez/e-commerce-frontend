import Accordion from 'react-bootstrap/Accordion';
import UserContext from '../UserContext';
import { Container, Col, Button, Form, Row, Card } from 'react-bootstrap';
import { useContext, Fragment, useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import AdminProductCard from '../components/AdminProductCard';
import '../App.css';

export default function Admin() {
	const userToken = localStorage.getItem('token');
	const { user, setUser } = useContext(UserContext);
	const [pName, setPName] = useState('');
	const [pDescription, setPDescription] = useState('');
	const [pPrice, setPPrice] = useState('');
	const [pImage, setPImage] = useState('');
	const [pCategory, setPCategory] = useState('');
	const [ispActive, setIspActive] = useState(false);
	const [adminProducts, setAdminProducts] = useState([]);

	document.addEventListener(
		'DOMContentLoaded',
		function () {
			fetch('https://cyan-weary-whale.cyclic.app/details', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${userToken}`,
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
		},
		false
	);

	useEffect(() => {
		fetch('https://cyan-weary-whale.cyclic.app/products/admin', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${userToken}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);

				// Sets the "courses" state to map the data retrieved from the fetch request in several "CourseCard" components
				setAdminProducts(
					data.map((adminProduct) => {
						return (
							<AdminProductCard
								key={adminProduct.id}
								adminProductProp={adminProduct}
							/>
						);
					})
				);
			});
	}, []);

	function registerProduct(e) {
		e.preventDefault();
		fetch('https://cyan-weary-whale.cyclic.app/products', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${userToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: pName,
				description: pDescription,
				price: pPrice,
				image: pImage,
				category: pCategory,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data !== false) {
					Swal.fire({
						title: 'Registration Successful',
						icon: 'success',
						text: 'Product has been added',
					});
				} else {
					Swal.fire({
						title: 'Duplicate product found',
						icon: 'error',
						text: 'Please provide different product',
					});
				}
			});

		// 		setPName('');
		// 		setPDescription('');
		// 		setPPrice('');
		// 		setPImage('');
		// 		setPCategory('');
	}

	useEffect(() => {
		if (
			pName !== '' &&
			pDescription !== '' &&
			pPrice !== '' &&
			pImage !== '' &&
			(pCategory == 'Peripherals' || pCategory == 'Components')
		) {
			setIspActive(true);
		} else {
			setIspActive(false);
		}
	}, [pName, pDescription, pPrice, pImage, pCategory]);

	return user.isAdmin !== true ? (
		<Redirect to="/" />
	) : (
		<Container style={{ minHeight: '660px' }}>
			<Fragment>
				<div className="my-3">
					<h1>Admin Page</h1>
				</div>
				<Accordion>
					<Accordion.Item eventKey="0">
						<Accordion.Header>Retrieve All Products</Accordion.Header>
						<Accordion.Body>
							<Row className="align-items-center mb-0 pb-0">
								<Col
									className="d-flex justify-content-center mb-0 pb-0"
									md={3}
								>
									<h6>Name</h6>
								</Col>
								<Col
									className="d-flex justify-content-center mb-0 pb-0"
									md={4}
								>
									<h6>Description</h6>
								</Col>
								<Col
									className="d-flex justify-content-start mb-0 pb-0"
									md={1}
								>
									<h6>Price</h6>
								</Col>
								<Col
									className="d-flex justify-content-start mb-0 pb-0"
									md={1}
								>
									<h6>Active</h6>
								</Col>
								<Col
									className="d-flex justify-content-start mb-0 pb-0"
									md={3}
								>
									<h6>Remove/Edit</h6>
								</Col>
							</Row>
							<Fragment>
								<Row>{adminProducts}</Row>
							</Fragment>
						</Accordion.Body>
					</Accordion.Item>

					<Accordion.Item eventKey="1">
						<Accordion.Header>Add New Product</Accordion.Header>
						<Accordion.Body>
							{/*START OF ADD NEW PRODUCT FORM*/}
							<Form onSubmit={(e) => registerProduct(e)}>
								<Form.Group className="mb-3">
									<Form.Label>Name</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter description"
										value={pName}
										maxlength="26"
										onChange={(e) => setPName(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Description</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter description"
										value={pDescription}
										maxlength="60"
										onChange={(e) => setPDescription(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Price</Form.Label>
									<Form.Control
										type="number"
										placeholder="Enter price"
										value={pPrice}
										onChange={(e) => setPPrice(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Image</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter image"
										value={pImage}
										onChange={(e) => setPImage(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group
									className="mb-3"
									inline
								>
									<Form.Label>Category:</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter category"
										value={pCategory}
										onChange={(e) => setPCategory(e.target.value)}
										required
									/>
								</Form.Group>
								<div className="d-flex justify-content-center mb-3 mt-4">
									{ispActive ? (
										<Button
											variant="primary"
											type="submit"
											style={{ borderRadius: 20 }}
											className="px-4"
										>
											Register New Product
										</Button>
									) : (
										<Button
											variant="dark"
											type="submit"
											style={{ borderRadius: 20 }}
											className="px-4"
											disabled
										>
											Register New Product
										</Button>
									)}
								</div>
							</Form>
							{/*END OF ADD NEW PRODUCT FORM*/}
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			</Fragment>
		</Container>
	);
}
