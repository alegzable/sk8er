import { LibraryTrick } from "./Trick/TrickTypes";
import { TricksAction } from "./tricksActionCreators";

export const tricksReducer = (state: LibraryTrick[] = [], action: TricksAction) => {
	switch (action.type) {
		case "TRICKS_INITIATE":
			return action.payload;
	}

	return state;
};
