import { Fragment, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Container, Row } from "react-bootstrap";
import Cart from "../components/Cart";
// import LoginUser from '../components/LoginUser'

export default function Products() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetch("https://frozen-fjord-80490.herokuapp.com/products")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);

				// Sets the "courses" state to map the data retrieved from the fetch request in several "CourseCard" components
				setProducts(
					data.map((product) => {
						return (
							<ProductCard
								key={product.id}
								productProp={product}
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
					<div className="d-flex justify-content-end mt-3 mb-5">
						<Cart />
					</div>
					{products}
				</Fragment>
			</Row>
		</Container>
	);
}
