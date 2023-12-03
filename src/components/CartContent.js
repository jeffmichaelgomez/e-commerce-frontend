import { Fragment, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import CartCard from '../components/CartCard';
// import LoginUser from '../components/LoginUser'

export default function Carts() {
	const [carts, setCarts] = useState([]);
	const userToken = localStorage.getItem('token');

	useEffect(() => {
		fetch('https://cyan-weary-whale.cyclic.app/myOrders', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${userToken}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data == '') {
					return false;
				} else {
					setCarts(
						data.orderedProducts.map((cart) => {
							return (
								<CartCard
									key={cart.id}
									cartProp={cart}
								/>
							);
						})
					);
				}
			});
	}, []);
	return (
		<Container>
			<Row>
				<>{carts}</>
			</Row>
		</Container>
	);
}
