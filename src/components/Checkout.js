import { Fragment, useEffect, useState } from 'react';
import CheckoutCard from '../components/CheckoutCard';
import { Container, Row } from 'react-bootstrap';
// import LoginUser from '../components/LoginUser'

export default function Checkout() {
	const [checkouts, setCheckouts] = useState([]);
	const userToken = localStorage.getItem('token');

	useEffect(() => {
		fetch('https://cyan-weary-whale.cyclic.app/getMyCheckout', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${userToken}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setCheckouts(
					data.map((checkout) => {
						return (
							<CheckoutCard
								key={checkout.id}
								checkoutProp={checkout}
							/>
						);
					})
				);
			});
	}, []);

	return (
		<Container>
			<Row>
				<Fragment>
					<div className="d-flex justify-content-end mt-3 mb-5"></div>
					{checkouts}
				</Fragment>
			</Row>
		</Container>
	);
}
