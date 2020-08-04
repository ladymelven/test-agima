import React from "react";
import "./App.css";

import Card from "./components/Card/Card";
import List from "./components/List/List";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./store/reducer";

const store = createStore(reducer);

store.subscribe(() => {
	const { todos } = store.getState();
	window.localStorage.setItem("todos", JSON.stringify(todos));
});

const App = () => {
	return (
		<Provider store={store}>
			<div className="App">
				<Card />
				<List />
			</div>
		</Provider>
	);
};

export default App;
