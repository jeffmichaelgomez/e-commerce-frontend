import PropTypes from 'prop-types';
import { Card, InputGroup, Form } from 'react-bootstrap';
import { Col, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import '../App.css';
import { useEffect, useState, Fragment } from 'react';

export default function CartCard({ cartProp }) {
	//console.log(props);
	const userToken = localStorage.getItem('token');
	const { _id, productName, subTotal, quantity, image } = cartProp;

	function addOne(e) {
		e.preventDefault();
		fetch('https://cyan-weary-whale.cyclic.app/increaseQuantity', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${userToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: _id,
			}),
		}).then((res) => res.json());
	}

	function lessOne(e) {
		e.preventDefault();
		if (quantity == 1) {
			Swal.fire({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!',
			}).then((result) => {
				if (result.isConfirmed) {
					fetch('https://cyan-weary-whale.cyclic.app/removeOneProduct', {
						method: 'POST',
						headers: {
							Authorization: `Bearer ${userToken}`,
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							id: _id,
						}),
					}).then((res) => res.json());

					Swal.fire('Removed!', 'Your order has been removed.', 'success').then(
						(result) => {
							if (result.isConfirmed) {
								onClick: window.location.reload(false);
							}
						}
					);
				}
			});
		} else {
			fetch('https://cyan-weary-whale.cyclic.app/decreaseQuantity', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${userToken}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id: _id,
				}),
			}).then((res) => res.json());
		}
	}

	return (
		<Col className="mb-3">
			<Card style={{ width: '18rem' }}>
				<Card.Img
					variant="top"
					className="imageProduct"
					src={image}
				/>
				<Card.Body>
					<Card.Title className="d-flex justify-content-center">
						{productName}
					</Card.Title>
					<div className="d-flex justify-content-center">
						<ButtonToolbar className="mb-3 mt-3">
							<ButtonGroup className="d-flex justify-content-center me-2">
								<InputGroup>
									<InputGroup.Text
										id="btnGroupAddon"
										style={{ height: '30px' }}
									>
										Quantity:
									</InputGroup.Text>
									<Button
										variant="secondary"
										className="py-0"
										onClick={(e) => lessOne(e)}
										style={{ height: '30px' }}
									>
										-
									</Button>
									<Fragment>
										<InputGroup.Text
											id="btnGroupAddon"
											style={{ height: '30px' }}
										>
											{quantity}
										</InputGroup.Text>
									</Fragment>
									<Button
										variant="secondary"
										className="py-0"
										onClick={(e) => addOne(e)}
										style={{ height: '30px' }}
									>
										+
									</Button>
								</InputGroup>
							</ButtonGroup>
						</ButtonToolbar>
					</div>
					<Card.Text className="d-flex justify-content-center">
						SubTotal: ₱{subTotal}.00
					</Card.Text>
				</Card.Body>
			</Card>
		</Col>
	);
}

// Checks the validity of the PropTypes
CartCard.propTypes = {
	// "shape" method is used to check if a prop object conforms to a specific shape
	cart: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		productName: PropTypes.string.isRequired,
		quantity: PropTypes.number.isRequired,
		subTotal: PropTypes.number.isRequired,
	}),
};
