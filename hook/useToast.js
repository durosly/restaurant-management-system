import { useReducer } from "react";

const initialState = {
	show: true,
	message: "",
	type: "",
};

function reducer(state, action) {
	switch (action.type) {
		case "SHOW_TOAST":
			return {
				...state,
				show: true,
				message: action.message,
				type: action.type,
			};
		case "HIDE_TOAST":
			return { ...state, show: false };
	}
}

function useToast() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const isShown = state.show;
	const hideToast = () => dispatch({ type: "HIDE_TOAST" });
	const showToast = ({ message, type }) =>
		dispatch({ type: "SHOW_TOAST", message, type });
	return { isShown, hideToast, showToast };
}

export default useToast;
