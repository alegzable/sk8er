import { LibraryTrick } from "./Trick/TrickTypes";
import {
	TricksAction,
	TRICKS_INITIATE_SUCCESS,
	TRICKS_INITIATE_REQUEST,
	TRICKS_INITIATE_ERROR,
} from "./tricksActionCreators";
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
		case TRICKS_INITIATE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case TRICKS_INITIATE_SUCCESS:
			return {
				loading: false,
				data: action.payload,
				error: undefined,
			};
		case TRICKS_INITIATE_ERROR:
			return {
				loading: false,
				data: [],
				error: action.payload,
			};
	}

	return state;
};
