import React from "react";
// import styles from "./Todos.module.css";

import Todo from "./Todo/Todo";

const Todos = props => {
	const todos = props.todos.map((todo, index) => {
		let past = false;
		let checkTime = false;
		const now = new Date().toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit"
		});

		if (todo.time <= now) {
			past = true;
		}

		/*Если закомментить предыдущий иф и раскомментить код ниже, краситься красным
		будет всё за предыдущие дни недели + всё за прошедшее время текущего дня. Для
		корректной работы в файле Todo тоже надо раскомментить кусок кода.*/

		// const today = new Date().getDay();
		// if (today === 0) {
		// 	if (props.weekday !== 0 || todo.time <= now) {
		// 		past = true;
		// 	}
		// 	/*отдельный кейс для воскресенья: любой день, кроме воскресенья - прошедший*/
		//
		// } else if (props.weekday < today && props.weekday !== 0) {
		// 	past = true;
		// } else if (props.weekday === today && todo.time <= now) {
		// 	past = true;
		// }
		// /* если выбран текущий день, проверяемся время */
		// if (props.weekday === today) {
		// 	checkTime = true; //проверяем время только для текущего дня
		// }

		return (
			<Todo
				time={todo.time}
				task={todo.task}
				id={todo.id}
				key={todo.id}
				past={past}
				checkTime={checkTime}
				position={index}
				listLength={props.todos.length}
			/>
		);
	});

	return <tbody>{todos}</tbody>;
};

export default Todos;
