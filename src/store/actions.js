export const GET_TODOS = "GET_TODOS";
export const ADD = "ADD";
export const DELETE = "DELETE";
export const EDIT_TIME = "EDIT_TIME";
export const EDIT_TASK = "EDIT_TASK";
export const COPY = "COPY";
export const SWITCH_DAY = "SWITCH_DAY";

export const getTodos = () => {
	let todos = JSON.parse(window.localStorage.getItem("todos"));
	if (todos === null) {
		//при первом запуске и на случай, если юзер почистил localStorage
		todos = {
			"0": [],
			"1": [],
			"2": [],
			"3": [],
			"4": [],
			"5": [],
			"6": []
		};

		window.localStorage.setItem("todos", JSON.stringify(todos));
	}
	return { type: GET_TODOS, todos: todos };
};
