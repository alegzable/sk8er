import { UserTrickPracticeDay } from "../../Tricks/Trick/TrickTypes";
import actionTypes, { PracticeDaysAction } from "./practiceDaysActionTypes";
import { State } from "../../../rootReducer";

const initialState: State<UserTrickPracticeDay[]> = {
	loading: false,
	data: [],
};

export const practiceDaysReducer = (
	state = initialState,
	action: PracticeDaysAction
): State<UserTrickPracticeDay[]> => {
	switch (action.type) {
		case actionTypes.PRACTICE_DAYS_INITIATE_REQUEST:
		case actionTypes.PRACTICE_DAYS_ADD_REQUEST:
		case actionTypes.PRACTICE_DAYS_UPDATE_REQUEST:
		case actionTypes.PRACTICE_DAYS_REMOVE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case actionTypes.PRACTICE_DAYS_INITIATE_SUCCESS:
			return {
				loading: false,
				data: action.payload,
			};
		case actionTypes.PRACTICE_DAYS_ADD_SUCCESS:
			return {
				loading: false,
				data: [...state.data, action.payload],
			};
		case actionTypes.PRACTICE_DAYS_UPDATE_SUCCESS:
			return {
				loading: false,
				data: [...state.data.filter((x) => x.id !== action.payload.id), action.payload],
			};
		case actionTypes.PRACTICE_DAYS_REMOVE_SUCCESS:
			return {
				loading: false,
				data: state.data.filter((x) => x.id !== action.payload),
			};
		case actionTypes.PRACTICE_DAYS_INITIATE_ERROR:
		case actionTypes.PRACTICE_DAYS_ADD_ERROR:
		case actionTypes.PRACTICE_DAYS_UPDATE_ERROR:
		case actionTypes.PRACTICE_DAYS_REMOVE_ERROR:
			return {
				loading: false,
				data: [...state.data],
				error: action.payload,
			};
	}

	return state;
};
