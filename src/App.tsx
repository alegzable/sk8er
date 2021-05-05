import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import Layout from "./Layout/Layout";
import Tricks from "./Pages/Tricks/Tricks";
import MyTricks from "./Pages/MyTricks/MyTricks";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Switch>
					<Route path="/" exact component={Tricks} />
					<Redirect path="/tricks" to="/" />
					<Route path="/my-tricks/:id?" component={MyTricks} />
					<Route path="/404" component={PageNotFound} />
					<Redirect to="/404" />
				</Switch>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
