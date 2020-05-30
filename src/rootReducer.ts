import { combineReducers } from "redux";
import { tricksReducer } from "./Pages/Tricks/tricksReducer";
import { myTricksReducer } from "./Pages/MyTricks/myTricksReducer";
import { practiceDaysReducer } from "./Pages/MyTricks/MyTrickDetails/practiceDaysReducer";

const rootReducer = combineReducers({
	tricks: tricksReducer,
	userTricks: myTricksReducer,
	practiceDays: practiceDaysReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type State<T> = {
	loading: boolean;
	data: T;
	error?: string;
};

export default rootReducer;
