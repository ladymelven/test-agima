import React, { useEffect } from "react";
import { connect } from "react-redux";
import { GET_TODOS, COPY, SWITCH_DAY } from "../../store/actions";
import styles from "./List.module.css";

const List = React.memo(props => {
	useEffect(() => {
		props.getTodos();
		//получаем todos из localStorage и записываем их в store
	}, [props]);

	const dragOverHandler = event => {
		event.preventDefault();
	};

	const dropHandler = event => {
		event.preventDefault();
		props.onCopy(event.target.id);
	};

	let weekdays = [];
	// создаем и наполняем массив, содержащий дивы с днями недели
	for (let i = 0; i < 7; i++) {
		let dayName;
		let payload;
		switch (i) {
			case 0:
				dayName = "ПН";
				payload = i + 1;
				break;
			case 1:
				dayName = "ВТ";
				payload = i + 1;
				break;
			case 2:
				dayName = "СР";
				payload = i + 1;
				break;
			case 3:
				dayName = "ЧТ";
				payload = i + 1;
				break;
			case 4:
				dayName = "ПТ";
				payload = i + 1;
				break;
			case 5:
				dayName = "СБ";
				payload = i + 1;
				break;
			case 6:
				dayName = "ВС";
				payload = 0;
				break;
			//no default
		}

		let classes = styles.Weekday;
		if (payload === props.weekday) {
			classes = classes + " " + styles.active;
		}

		weekdays.push(
			<div
				className={classes}
				key={i}
				onDragOver={event => dragOverHandler(event)}
				onDrop={event => dropHandler(event)}
				onClick={() => props.onSwitch(payload)}
				id={payload}
			>
				{dayName}
			</div>
		);
	}

	return <div>{weekdays}</div>;
});

const mapStateToProps = state => {
	return {
		weekday: state.weekday
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSwitch: day => dispatch({ type: SWITCH_DAY, day: day }),
		onCopy: day => dispatch({ type: COPY, day: day }),
		getTodos: () => dispatch({ type: GET_TODOS })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
