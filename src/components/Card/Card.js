import React, { useState } from "react";
import { connect } from "react-redux";
import styles from "./Card.module.css";

import Todos from "../Todos/Todos";
import AddTodoForm from "../AddTodoForm/AddTodoForm";

const Card = props => {
	let [isAdding, setAdding] = useState(false);
	//регулирует, показывается ли форма добавления строки

	const dragStartHandler = event => {
		event.target.className = styles.asterisk + " " + styles.dragging;
	};

	const dragEndHandler = event => {
		event.target.className = styles.asterisk;
	};

	const resetFormHandler = () => {
		setAdding(false);
	}; //после добавления строки убираем форму и возвращаем плюс

	let weekday = props.weekday;
	switch (weekday) {
		case 0:
			weekday = "Воскресенье";
			break;
		case 1:
			weekday = "Понедельник";
			break;
		case 2:
			weekday = "Вторник";
			break;
		case 3:
			weekday = "Среда";
			break;
		case 4:
			weekday = "Четверг";
			break;
		case 5:
			weekday = "Пятница";
			break;
		case 6:
			weekday = "Суббота";
			break;
		//no default
	}

	return (
		<div className={styles.Card}>
			<div
				className={styles.asterisk}
				draggable="true"
				onDragStart={dragStartHandler}
				onDragEnd={dragEndHandler}
			>
				*
			</div>
			<h2 className={styles.heading}>{weekday}</h2>
			<table className={styles.todos}>
				<Todos todos={props.todos} weekday={props.weekday} />
			</table>
			{isAdding ? (
				<AddTodoForm reset={resetFormHandler} />
			) : (
				<div className={styles.add} onClick={() => setAdding(true)}>
					+
				</div>
			)}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		weekday: state.weekday,
		todos: state.todos[state.weekday]
	};
};

export default connect(mapStateToProps)(Card);
