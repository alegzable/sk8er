import { LibraryTrick, MyTrick } from "./Pages/Tricks/Trick/TrickTypes";
import { combineReducers } from "redux";
import { tricksReducer } from "./Pages/Tricks/tricksReducer";
import { myTricksReducer } from "./Pages/MyTricks/myTricksReducer";

export type State<T> = {
	loading: boolean;
	data: T;
	error?: string;
};

export type RootState = {
	tricks: State<LibraryTrick[]>;
	myTricks: MyTrick[];
};

export default combineReducers({ tricks: tricksReducer, myTricks: myTricksReducer });
