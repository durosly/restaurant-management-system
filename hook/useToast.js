import { useReducer } from "react";

const initialState = {
	show: false,
	message: "",
	alert_type: "",
};

function reducer(state, action) {
	switch (action.type) {
		case "SHOW_TOAST":
			return {
				...state,
				show: true,
				message: action.message,
				alert_type: action.alert_type,
			};
		case "HIDE_TOAST":
			return { ...state, show: false, message: "" };

		default:
			return state;
	}
}

function useToast() {
	const [state, dispatch] = useReducer(reducer, initialState);

	// const isShown = state.show;
	const hideToast = () => dispatch({ type: "HIDE_TOAST" });
	const showToast = ({ message, alert_type }) =>
		dispatch({ type: "SHOW_TOAST", message, alert_type });
	return {
		isShown: state.show,
		hideToast,
		showToast,
		message: state.message,
		alert_type: state.alert_type,
	};
}

export default useToast;
