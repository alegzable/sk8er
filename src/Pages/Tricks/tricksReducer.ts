import { LibraryTrick } from "./Trick/TrickTypes";
import { TricksAction, TRICKS_INITIATE_SUCCESS } from "./tricksActionCreators";

export const tricksReducer = (state: LibraryTrick[] = [], action: TricksAction): LibraryTrick[] => {
	switch (action.type) {
		case TRICKS_INITIATE_SUCCESS:
			return action.payload;
	}

	return state;
};
