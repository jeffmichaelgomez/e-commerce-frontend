import { Fragment, useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import CarouselHome from "../components/CarouselHome";
import HomeSpace from "../components/HomeSpace";
import "../App.css";

export default function Home() {
	const userToken = localStorage.getItem("token");
	const { user, setUser } = useContext(UserContext);

	document.addEventListener(
		"DOMContentLoaded",
		function () {
			fetch("https://frozen-fjord-80490.herokuapp.com/details", {
				method: "GET",
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
	return (
		<Fragment>
			<CarouselHome />
			<HomeSpace />
		</Fragment>
	);
}
