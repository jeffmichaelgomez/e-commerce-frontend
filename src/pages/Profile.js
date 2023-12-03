import { Fragment } from "react";
import Checkout from "../components/Checkout";
import Accordion from "react-bootstrap/Accordion";
import CartContent from "../components/CartContent";
import { Row, Col, Button, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function Profile() {
	const [show, setShow] = useState(false);
	const userToken = localStorage.getItem("token");
	let [total, setTotal] = useState(0);
	let history = useHistory();
	function checkOut(e) {
		e.preventDefault();
		fetch("https://frozen-fjord-80490.herokuapp.com/checkOut", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${userToken}`,
			},
		}).then((res) => res.json());
		Swal.fire("Removed!", "Your order has been removed.", "success").then(
			(result) => {
				if (result.isConfirmed) {
					onClick: history.push("/");
				}
			}
		);
	}
	useEffect(() => {
		fetch("https://frozen-fjord-80490.herokuapp.com/myOrders", {
			method: "GET",
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
		<Container style={{ minHeight: "660px" }}>
			<Fragment>
				<div className="my-3">
					<h3>My Profile</h3>
				</div>
				<Accordion defaultActiveKey="0">
					<Accordion.Item eventKey="0">
						<Accordion.Header>My Cart</Accordion.Header>
						<Accordion.Body>
							<div
								div
								className="d-block align-center"
							>
								<CartContent />
							</div>
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
						</Accordion.Body>
					</Accordion.Item>

					<Accordion.Item eventKey="1">
						<Accordion.Header className="mb-0">
							My Order History
						</Accordion.Header>
						<Accordion.Body className="mt-0">
							<Checkout />
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			</Fragment>
		</Container>
	);
}
