import { LibraryTrick } from "./Trick/TrickTypes";
import actionTypes, { TricksAction } from "./tricksActionTypes";
import { State } from "../../rootReducer";

const initialState: State<LibraryTrick[]> = {
	loading: false,
	data: [],
};

export const tricksReducer = (
	state: State<LibraryTrick[]> = initialState,
	action: TricksAction
): State<LibraryTrick[]> => {
	switch (action.type) {
		case actionTypes.TRICKS_INITIATE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case actionTypes.TRICKS_INITIATE_SUCCESS:
			return {
				loading: false,
				data: action.payload,
			};
		case actionTypes.TRICKS_INITIATE_ERROR:
			return {
				loading: false,
				data: [],
				error: action.payload,
			};
	}

	return state;
};
