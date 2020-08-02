import * as actions from "./actions";

const today = new Date().getDay();

const initialState = {
	weekday: today,
	todos: {
		"0": [],
		"1": [],
		"2": [],
		"3": [],
		"4": [],
		"5": [],
		"6": []
	}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.GET_TODOS:
			const todos = JSON.parse(window.localStorage.getItem("todos"));
			if (todos === null) {
				//при первом запуске и на случай, если юзер почистил localStorage
				window.localStorage.setItem(
					"todos",
					JSON.stringify(initialState.todos)
				);
			}
			return {
				...state,
				todos: todos
			};

		case actions.ADD:
			const newTodos = JSON.parse(JSON.stringify(state.todos));
			//потенциально дорогая операция, но для небольшого приложения ок + железно deep copy
			const newTodo = {
				id: state.weekday + "-" + action.payload.time + "." + Math.random(),
				//теоретически, конечно, может быть дубль, но вероятность очень мала
				time: action.payload.time,
				task: action.payload.task
			};
			newTodos[state.weekday].push(newTodo);
			newTodos[state.weekday].sort((a, b) => (a.time > b.time ? 1 : -1));

			window.localStorage.setItem("todos", JSON.stringify(newTodos));
			return {
				...state,
				todos: newTodos
			};

		case actions.DELETE:
			const updatedTodos = JSON.parse(JSON.stringify(state.todos));
			updatedTodos[state.weekday] = updatedTodos[state.weekday].filter(
				todo => todo.id !== action.id
			);
			window.localStorage.setItem("todos", JSON.stringify(updatedTodos));
			return {
				...state,
				todos: updatedTodos
			};

		case actions.EDIT_TIME:
			const todosTimeUpdated = JSON.parse(JSON.stringify(state.todos));
			const timeUpdated = todosTimeUpdated[state.weekday].find(
				todo => todo.id === action.payload.id
			);
			timeUpdated.time = action.payload.time;
			todosTimeUpdated[state.weekday].sort((a, b) =>
				a.time > b.time ? 1 : -1
			);
			window.localStorage.setItem("todos", JSON.stringify(todosTimeUpdated));
			return {
				...state,
				todos: todosTimeUpdated
			};

		case actions.EDIT_TASK:
			const todosTaskUpdated = JSON.parse(JSON.stringify(state.todos));
			const taskUpdated = todosTaskUpdated[state.weekday].find(
				todo => todo.id === action.payload.id
			);
			taskUpdated.task = action.payload.task;
			window.localStorage.setItem("todos", JSON.stringify(todosTaskUpdated));
			return {
				...state,
				todos: todosTaskUpdated
			};

		case actions.COPY:
			const copiedDayTodos = JSON.parse(JSON.stringify(state.todos));
			console.log();
			copiedDayTodos[action.day] = [];
			copiedDayTodos[state.weekday].forEach(todo => {
				copiedDayTodos[action.day].push({ ...todo });
			}); //нужный уровень вложенности: внутри туду хранятся только примитивы
			window.localStorage.setItem("todos", JSON.stringify(copiedDayTodos));
			return {
				...state,
				todos: copiedDayTodos
			};

		case actions.SWITCH_DAY:
			const newState = {
				...state,
				weekday: action.day
			};
			return newState;
		default:
			return state;
	}
};

export default reducer;
