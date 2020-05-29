import { LibraryTrick } from "./Trick/TrickTypes";
import { TricksAction } from "./tricksActionCreators";

export const tricksReducer = (state: LibraryTrick[] = [], action: TricksAction) => {
	switch (action.type) {
		case "TRICKS_ADD":
			return [...state, ...action.payload];
	}

	return state;
};
