import { UserTrick } from "../Tricks/Trick/TrickTypes";

const actionTypes = {
	MY_TRICKS_LOAD_REQUEST: "MY_TRICKS_LOAD_REQUEST",
	MY_TRICKS_LOAD_SUCCESS: "MY_TRICKS_LOAD_SUCCESS",
	MY_TRICKS_LOAD_ERROR: "MY_TRICKS_LOAD_ERROR",

	MY_TRICKS_ADD_REQUEST: "MY_TRICKS_ADD_REQUEST",
	MY_TRICKS_ADD_SUCCESS: "MY_TRICKS_ADD_SUCCESS",
	MY_TRICKS_ADD_ERROR: "MY_TRICKS_ADD_ERROR",

	MY_TRICKS_REMOVE_REQUEST: "MY_TRICKS_REMOVE_REQUEST",
	MY_TRICKS_REMOVE_SUCCESS: "MY_TRICKS_REMOVE_SUCCESS",
	MY_TRICKS_REMOVE_ERROR: "MY_TRICKS_REMOVE_ERROR",
} as const;

export type MyTricksLoadAction =
	| { type: typeof actionTypes.MY_TRICKS_LOAD_REQUEST }
	| { type: typeof actionTypes.MY_TRICKS_LOAD_SUCCESS; payload: UserTrick[] }
	| { type: typeof actionTypes.MY_TRICKS_LOAD_ERROR; payload: string };

export type MyTricksAddAction =
	| { type: typeof actionTypes.MY_TRICKS_ADD_REQUEST }
	| { type: typeof actionTypes.MY_TRICKS_ADD_SUCCESS; payload: UserTrick }
	| { type: typeof actionTypes.MY_TRICKS_ADD_ERROR; payload: string };

export type MyTricksRemoveAction =
	| { type: typeof actionTypes.MY_TRICKS_REMOVE_REQUEST }
	| { type: typeof actionTypes.MY_TRICKS_REMOVE_SUCCESS; payload: string }
	| { type: typeof actionTypes.MY_TRICKS_REMOVE_ERROR; payload: string };

export type MyTricksAction = MyTricksLoadAction | MyTricksAddAction | MyTricksRemoveAction;

export default actionTypes;
