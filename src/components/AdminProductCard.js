import PropTypes from 'prop-types';
import { Card, Form } from 'react-bootstrap';
import { Col, Button, Row, Offcanvas } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Fragment, useState, useEffect } from 'react';

export default function AdminProductCard({ adminProductProp }) {
	const userToken = localStorage.getItem('token');
	const { _id, isActive, name, description, price } = adminProductProp;
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [show, setShow] = useState(false);
	const [aName, setAName] = useState('');
	const [aDescription, setADescription] = useState('');
	const [aPrice, setAPrice] = useState('');
	const [aImage, setAImage] = useState('');
	const [aCategory, setACategory] = useState('');
	const [isaActive, setIsaActive] = useState(false);

	function updateProduct(e) {
		fetch(`https://cyan-weary-whale.cyclic.app/products/${_id}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${userToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: aName,
				description: aDescription,
				price: aPrice,
				image: aImage,
				category: aCategory,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				Swal.fire({
					title: 'Successfully Updated!',
					icon: 'success',
					text: 'Product has been updated.',
					confirmButtonText: 'OK',
				}).then((result) => {
					if (result.isConfirmed) {
						onClick: window.location.reload(false);
					}
				});
			});
	}
	function disableProduct(e) {
		fetch(`https://cyan-weary-whale.cyclic.app/products/${_id}/archive`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${userToken}`,
			},
		}).then((res) => res.json());
	}
	function enableProduct(e) {
		fetch(`https://cyan-weary-whale.cyclic.app/products/${_id}/restock`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${userToken}`,
			},
		}).then((res) => res.json());
	}

	useEffect(() => {
		if (
			aName !== '' &&
			aDescription !== '' &&
			aPrice !== '' &&
			aImage !== '' &&
			(aCategory == 'Peripherals' || aCategory == 'Components')
		) {
			setIsaActive(true);
		} else {
			setIsaActive(false);
		}
	}, [aName, aDescription, aPrice, aImage, aCategory]);

	return (
		<Card>
			<Card.Body
				className="my-0 py-0"
				style={{ borderRadius: 0 }}
			>
				<Row className="align-items-center mb-0 pb-0">
					<Col
						className="d-flex justify-content-center mb-0 pb-0"
						md={3}
					>
						<h6>{name}</h6>
					</Col>
					<Col
						className="d-flex justify-content-center mb-0 pb-0"
						md={4}
					>
						<Card.Text>{description.slice(0, 45)}</Card.Text>
					</Col>
					<Col
						className="d-flex justify-content-start mb-0 pb-0"
						md={1}
					>
						<Card.Text>Php {price}</Card.Text>
					</Col>
					<Col
						className="d-flex justify-content-start mb-0 pb-0"
						md={1}
					>
						<Card.Text>{isActive ? 'Enabled' : 'Disabled'}</Card.Text>
					</Col>
					<Col
						className="d-flex justify-content-start mt-0 pt-0"
						md={3}
					>
						{isActive ? (
							<Button
								variant="danger"
								size="sm"
								type="submit"
								style={{ borderRadius: 20 }}
								onClick={(e) => disableProduct(e)}
							>
								Disable
							</Button>
						) : (
							<Fragment>
								<Button
									variant="primary"
									size="sm"
									type="submit"
									style={{ borderRadius: 20 }}
									onClick={(e) => enableProduct(e)}
								>
									Enable
								</Button>
							</Fragment>
						)}
						<>
							<Button
								variant="success"
								size="sm"
								type="submit"
								style={{ borderRadius: 20 }}
								className="px-3 mx-2 pt-0 pb-0"
								onClick={handleShow}
							>
								Edit
							</Button>
							{/*EDIT PRODUCT OFFCANVAS START*/}
							<Offcanvas
								show={show}
								onHide={handleClose}
								placement="end"
							>
								<Offcanvas.Header closeButton>
									<Offcanvas.Title>Update Product</Offcanvas.Title>
								</Offcanvas.Header>
								<Offcanvas.Body>
									<Form onSubmit={(e) => updateProduct(e)}>
										<Form.Group className="mb-3">
											<Form.Label>Name</Form.Label>
											<Form.Control
												type="text"
												placeholder="Enter description"
												value={aName}
												maxlength="26"
												onChange={(e) => setAName(e.target.value)}
												required
											/>
										</Form.Group>

										<Form.Group className="mb-3">
											<Form.Label>Description</Form.Label>
											<Form.Control
												type="text"
												placeholder="Enter description"
												value={aDescription}
												maxlength="60"
												onChange={(e) => setADescription(e.target.value)}
												required
											/>
										</Form.Group>

										<Form.Group className="mb-3">
											<Form.Label>Price</Form.Label>
											<Form.Control
												type="number"
												placeholder="Enter price"
												value={aPrice}
												onChange={(e) => setAPrice(e.target.value)}
												required
											/>
										</Form.Group>

										<Form.Group className="mb-3">
											<Form.Label>Image</Form.Label>
											<Form.Control
												type="text"
												placeholder="Enter image"
												value={aImage}
												onChange={(e) => setAImage(e.target.value)}
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
												value={aCategory}
												onChange={(e) => setACategory(e.target.value)}
												required
											/>
										</Form.Group>
										<div className="d-flex justify-content-center mb-3 mt-4">
											{isaActive ? (
												<Button
													variant="primary"
													type="submit"
													style={{ borderRadius: 20 }}
													className="px-4"
												>
													Update Product
												</Button>
											) : (
												<Button
													variant="dark"
													type="submit"
													style={{ borderRadius: 20 }}
													className="px-4"
													disabled
												>
													Update Product
												</Button>
											)}
										</div>
									</Form>
									{/*EDIT PRODUCT OFFCANVAS END*/}
								</Offcanvas.Body>
							</Offcanvas>
						</>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
}

// Checks the validity of the PropTypes
AdminProductCard.propTypes = {
	// "shape" method is used to check if a prop object conforms to a specific shape
	adminProduct: PropTypes.shape({
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
	}),
};
