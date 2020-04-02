import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import Tricks from "./Pages/Tricks/Tricks";
import MyTricks from "./Pages/MyTricks/MyTricks";

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Switch>
					<Route path="/my-tricks">
						<MyTricks />
					</Route>
					<Route path="/">
						<Tricks />
					</Route>
				</Switch>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
