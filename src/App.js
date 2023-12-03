import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";

import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer";
import "./App.css";
import { UserProvider } from "./UserContext";
function App() {
	const [user, setUser] = useState({
		id: null,
		isAdmin: null,
	});
	// Function for clearing localStorage on logout
	const unsetUser = () => {
		localStorage.clear();
	};
	useEffect(() => {
		console.log(user);
		console.log(localStorage);
	}, [user]);

	return (
		<UserProvider value={{ user, setUser, unsetUser }}>
			<Router>
				<AppNavbar />
				<Switch>
					<Route
						exact
						path="/"
						component={Home}
					/>
					<Route
						exact
						path="/register"
						component={Register}
					/>
					<Route
						exact
						path="/login"
						component={Login}
					/>
					<Route
						exact
						path="/logout"
						component={Logout}
					/>
					<Route
						exact
						path="/products"
						component={Products}
					/>
					<Route
						exact
						path="/profile"
						component={Profile}
					/>
					<Route
						exact
						path="/admin"
						component={Admin}
					/>
				</Switch>
				<Footer />
			</Router>
		</UserProvider>
	);
}

export default App;
