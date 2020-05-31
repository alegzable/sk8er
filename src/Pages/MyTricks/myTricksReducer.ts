import { UserTrick } from "../Tricks/Trick/TrickTypes";
import actionTypes, { MyTricksAction } from "./myTricksActionTypes";
import { State } from "../../rootReducer";

const initialState: State<UserTrick[]> = {
	loading: false,
	data: [],
};

export const myTricksReducer = (state = initialState, action: MyTricksAction): State<UserTrick[]> => {
	switch (action.type) {
		case actionTypes.MY_TRICKS_INITIATE_REQUEST:
		case actionTypes.MY_TRICKS_ADD_REQUEST:
		case actionTypes.MY_TRICKS_REMOVE_REQUEST:
			return {
				...state,
				loading: true,
			};

		case actionTypes.MY_TRICKS_INITIATE_SUCCESS:
			return {
				loading: false,
				data: action.payload,
			};
		case actionTypes.MY_TRICKS_ADD_SUCCESS:
			return { loading: false, data: [...state.data, action.payload] };
		case actionTypes.MY_TRICKS_REMOVE_SUCCESS:
			return { loading: false, data: state.data.filter((x) => x.libraryTrickId !== action.payload) };
		case actionTypes.MY_TRICKS_INITIATE_ERROR:
		case actionTypes.MY_TRICKS_ADD_ERROR:
		case actionTypes.MY_TRICKS_REMOVE_ERROR:
			return {
				loading: false,
				data: [...state.data],
				error: action.payload,
			};
	}

	return state;
};
