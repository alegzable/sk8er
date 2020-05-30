import { UserTrick } from "../Tricks/Trick/TrickTypes";
import {
	MyTricksAction,
	MY_TRICKS_ADD_SUCCESS,
	MY_TRICKS_INITIATE_SUCCESS,
	MY_TRICKS_REMOVE_SUCCESS,
	MY_TRICKS_INITIATE_REQUEST,
	MY_TRICKS_ADD_REQUEST,
	MY_TRICKS_REMOVE_REQUEST,
	MY_TRICKS_INITIATE_ERROR,
	MY_TRICKS_ADD_ERROR,
	MY_TRICKS_REMOVE_ERROR,
} from "./myTricksActionTypes";
import { State } from "../../rootReducer";

const initialState: State<UserTrick[]> = {
	loading: false,
	data: [],
};

export const myTricksReducer = (state = initialState, action: MyTricksAction): State<UserTrick[]> => {
	switch (action.type) {
		case MY_TRICKS_INITIATE_REQUEST:
		case MY_TRICKS_ADD_REQUEST:
		case MY_TRICKS_REMOVE_REQUEST:
			return {
				...state,
				loading: true,
			};

		case MY_TRICKS_INITIATE_SUCCESS:
			return {
				loading: false,
				data: action.payload,
			};
		case MY_TRICKS_ADD_SUCCESS:
			return { loading: false, data: [...state.data, action.payload] };
		case MY_TRICKS_REMOVE_SUCCESS:
			return { loading: false, data: state.data.filter((x) => x.libraryTrickId !== action.payload) };
		case MY_TRICKS_INITIATE_ERROR:
		case MY_TRICKS_ADD_ERROR:
		case MY_TRICKS_REMOVE_ERROR:
			return {
				loading: false,
				data: [...state.data],
				error: action.payload,
			};
	}

	return state;
};
