import { Button, Offcanvas } from 'react-bootstrap';
import { useEffect, useState, Fragment } from 'react';
import cart from '../logo/cart.png';
import CartContent from '../components/CartContent';
import Swal from 'sweetalert2';
import { useHistory, Redirect } from 'react-router-dom';

export default function Cart() {
	const [show, setShow] = useState(false);
	const userToken = localStorage.getItem('token');
	let [total, setTotal] = useState(0);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	let history = useHistory();

	function checkOut(e) {
		e.preventDefault();
		fetch('https://cyan-weary-whale.cyclic.app/checkOut', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${userToken}`,
			},
		}).then((res) => res.json());
		Swal.fire('Order Successful!', 'Thank you for shopping!.', 'success').then(
			(result) => {
				if (result.isConfirmed) {
					onClick: history.push('/');
				}
			}
		);
	}

	useEffect(() => {
		fetch('https://cyan-weary-whale.cyclic.app/myOrders', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${userToken}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data !== null) {
					setTotal((total = data.totalAmount));
				}
			});
	}, []);

	return (
		<>
			<img
				src={cart}
				className="cart"
				onClick={handleShow}
			/>
			<Offcanvas
				show={show}
				onHide={handleClose}
				placement="end"
			>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Your Cart</Offcanvas.Title>
					<Offcanvas.Title>Total: ₱{total}</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<CartContent />
					<div className="d-flex justify-content-center">
						{total == 0 ? (
							<Button
								variant="danger"
								onClick={(e) => checkOut(e)}
								type="submit"
								style={{ borderRadius: 20 }}
								className="px-4"
								disabled
							>
								Your Cart is Empty
							</Button>
						) : (
							<Fragment>
								<Button
									variant="danger"
									onClick={(e) => checkOut(e)}
									type="submit"
									style={{ borderRadius: 20 }}
									className="px-4"
								>
									Checkout
								</Button>
							</Fragment>
						)}
					</div>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}
