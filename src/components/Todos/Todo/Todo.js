import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { EDIT_TIME, EDIT_TASK, DELETE } from "../../../store/actions";
import styles from "./Todo.module.css";

const Todo = props => {
	const [past, updatePast] = useState(false);
	const [isEditingTime, setEditingTime] = useState(false);
	const [isEditingTask, setEditingTask] = useState(false);
	//redux для этого всего не нужен, эти состояния - внутреннего пользования

	let classes = [styles.added, styles.todo];

	if (past || props.past) {
		classes.push(styles.past);
	} //когда время прошло/если туду добавлен уже в прошедшее время - добавляем класс,
	//который будет красить тудушку в красный

	useEffect(() => {
		//раскомментить иф (строку 34 тоже), чтобы проверялся только текущий день
		//для корректной работы в Todos тоже надо раскомментить кусок кода
		let update;
		// if (props.checkTime) {
		update = setInterval(() => {
			const now = new Date().toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			});
			if (props.time <= now) {
				updatePast(true);
			}
		}, 60000);
		// }
		if (props.past) {
			clearInterval(update);
		}
		//раз в минуту проверяет, не прошло ли время
		return () => clearInterval(update);
	}, [props.past, props.time, props.checkTime]);
	//активируется еще раз, если время будет отредактировано

	useEffect(() => {
		setTimeout(() => {
			if (classes[0] === styles.added) {
				classes.shift();
			}
			/*Надо удалить класс анимации, когда она закончится, иначе он сработает
			при следующем рендере */
		}, 400);
	}, [classes]);
	/* линтер на меня ругается. На самом деле массив заивисимостей стоит оставить
	пустым, мы убираем класс железно только один раз - после добавления в список */

	let timeEl = props.time;
	if (isEditingTime) {
		timeEl = (
			<form
				onSubmit={event => {
					event.preventDefault();
					setEditingTime(false);
					props.onEditTime({
						time: event.target.editTime.value,
						id: event.target.closest("tr").id
					});
				}}
				/*При потере фокуса возвращаем изначальное значение поля*/
				onBlur={() => setEditingTime(false)}
			>
				<input
					className={styles.edit + " " + styles.editTime}
					type="text"
					name="editTime"
					pattern="[0-9]{2}:[0-9]{2}"
					placeholder={props.time}
					autoFocus
				/>
				{/* При клике на input type="time" не срабатывает submit, поэтому
				type="text" с валидацией в виде pattern */}
			</form>
		);
	}

	let taskEl = props.task;
	//фактически изначально это не элемент DOM, а текст в клетке таблицы
	if (isEditingTask) {
		//при клике превращается в форму из одного поля ввода
		taskEl = (
			<form
				onSubmit={event => {
					event.preventDefault();
					setEditingTask(false);
					props.onEditTask({
						task: event.target.editTask.value,
						id: event.target.closest("tr").id
					});
				}}
				/*При потере фокуса возвращаем изначальное значение поля*/
				onBlur={() => setEditingTask(false)}
			>
				<input
					className={styles.edit}
					type="text"
					name="editTask"
					placeholder={props.task}
					autoFocus
				/>
			</form>
		);
	}

	return (
		<tr
			className={classes.join(" ")}
			id={props.id}
			//это для вычисления координат старта анимации
			style={{ "--position": props.position, "--length": props.listLength }}
		>
			<td className={styles.time} onClick={() => setEditingTime(true)}>
				{timeEl}
			</td>
			<td className={styles.task} onClick={() => setEditingTask(true)}>
				{taskEl}
			</td>
			<td
				className={styles.remove}
				onClick={event => props.onDelete(event.target.closest("tr").id)}
			>
				&times;
			</td>
		</tr>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		onEditTime: data => dispatch({ type: EDIT_TIME, payload: data }),
		onEditTask: data => dispatch({ type: EDIT_TASK, payload: data }),
		onDelete: id => dispatch({ type: DELETE, id: id })
	};
};

export default connect(null, mapDispatchToProps)(Todo);
