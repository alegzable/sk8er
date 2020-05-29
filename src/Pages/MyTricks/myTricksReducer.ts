import { MyTrick } from "../Tricks/Trick/TrickTypes";
import { MyTricksAction } from "./myTricksActionCreators";

export const myTricksReducer = (state: MyTrick[] = [], action: MyTricksAction) => {
	switch (action.type) {
		case "MY_TRICKS_INITIATE":
			return action.payload;
		case "MY_TRICK_ADD":
			return [...state, action.payload];
		case "MY_TRICK_REMOVE":
			return state.filter((x) => x.id !== action.payload);
	}

	return state;
};
