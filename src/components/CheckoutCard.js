import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Row, Col, Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function CheckoutCard({ checkoutProp }) {
	//console.log(props);
	const {
		_id,
		totalAmount,
		customerName,
		customerId,
		purchasedOn,
		orderedProducts,
	} = checkoutProp;
	return (
		<Card className="mb-1">
			<Card.Body
				className="my-0 py-0"
				style={{ borderRadius: 0 }}
			>
				<Row className="align-items-center mb-0 pb-0">
					<Col
						className="d-flex justify-content-center mb-0 pb-0"
						md={3}
					>
						<Card.Text>Order ID: {_id}</Card.Text>
					</Col>
					<Col
						className="d-flex justify-content-center mb-0 pb-0"
						md={3}
					>
						<Card.Text>Purchased On: {purchasedOn.slice(0, 10)}</Card.Text>
					</Col>
					<Col
						className="d-flex justify-content-start mb-0 pb-0"
						md={3}
					>
						<Card.Text>Total Amount: {totalAmount}</Card.Text>
					</Col>
					<Col
						className="d-flex justify-content-start mb-0 pb-0"
						md={3}
					>
						Status: Completed
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
}

// Checks the validity of the PropTypes
CheckoutCard.propTypes = {
	// "shape" method is used to check if a prop object conforms to a specific shape
	checkout: PropTypes.shape({
		totalAmount: PropTypes.number.isRequired,
		customerName: PropTypes.string.isRequired,
		customerId: PropTypes.string.isRequired,
		purchasedOn: PropTypes.string.isRequired,
	}),
};
