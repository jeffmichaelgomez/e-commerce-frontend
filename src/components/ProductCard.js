import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Col, Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function ProductCard({ productProp }) {
	//console.log(props);
	const userToken = localStorage.getItem("token");
	const { _id, name, description, price, image } = productProp;
	function addToCart(e) {
		fetch("https://frozen-fjord-80490.herokuapp.com/addToCart", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${userToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: _id,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				Swal.fire({
					title: "Successfully Added",
					icon: "success",
					text: "Happy Shopping!",
					confirmButtonText: "Continue Shopping",
				}).then((result) => {
					if (result.isConfirmed) {
						onClick: window.location.reload(false);
					}
				});
			});
	}
	return (
		<Col
			xs={12}
			md={6}
			lg={3}
			className="mb-3"
		>
			<Card style={{ width: "18rem" }}>
				<Card.Img
					variant="top"
					className="imageProduct"
					src={image}
				/>
				<Card.Body>
					<Card.Title>{name}</Card.Title>
					<Card.Text>{description.slice(0, 60)}</Card.Text>
					<Card.Text>Php {price}</Card.Text>
					<div className="d-flex justify-content-center">
						<Button
							variant="dark"
							type="submit"
							onClick={(e) => addToCart(e)}
						>
							Add to Cart
						</Button>
					</div>
				</Card.Body>
			</Card>
		</Col>
	);
}

// Checks the validity of the PropTypes
ProductCard.propTypes = {
	// "shape" method is used to check if a prop object conforms to a specific shape
	product: PropTypes.shape({
		image: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
	}),
};
