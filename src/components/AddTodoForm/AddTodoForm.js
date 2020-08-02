import React from "react";
import { connect } from "react-redux";
import { ADD } from "../../store/actions";
import styles from "./AddTodoForm.module.css";

const AddTodoForm = props => {
	const submitHandler = event => {
		event.preventDefault();
		props.reset(); //убираем форму, возвращаем плюс
		props.onSubmit({
			time: event.target.time.value,
			task: event.target.task.value
		}); //передаем действие в редьюсер
		event.target.time.value = "";
		event.target.task.value = "";
		//очищаем форму
	};

	return (
		<form className={styles.form} onSubmit={event => submitHandler(event)}>
			<input
				type="time"
				name="time"
				id="time"
				className={styles.input + " " + styles.timeInput}
				required="required"
			/>
			<input
				type="text"
				name="task"
				id="task"
				className={styles.input}
				required="required"
			/>
			<button type="submit" className={styles.submit}>
				+
			</button>
		</form>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		onSubmit: data => dispatch({ type: ADD, payload: data })
	};
};

export default connect(null, mapDispatchToProps)(AddTodoForm);
