import React from "react";
import ReactDOM from "react-dom";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import "./styles/reset.scss";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "what-input";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { tricksReducer } from "./Pages/Tricks/tricksReducer";

const rootReducer = combineReducers({ tricksReducer });

const store = createStore(rootReducer);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
