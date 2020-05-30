import { UserTrick } from "../Tricks/Trick/TrickTypes";

export const MY_TRICKS_INITIATE_REQUEST = "MY_TRICKS_INITIATE_REQUEST" as const;
export const MY_TRICKS_INITIATE_SUCCESS = "MY_TRICKS_INITIATE_SUCCESS" as const;
export const MY_TRICKS_INITIATE_ERROR = "MY_TRICKS_INITIATE_ERROR" as const;

export const MY_TRICKS_ADD_REQUEST = "MY_TRICKS_ADD_REQUEST" as const;
export const MY_TRICKS_ADD_SUCCESS = "MY_TRICKS_ADD_SUCCESS" as const;
export const MY_TRICKS_ADD_ERROR = "MY_TRICKS_ADD_ERROR" as const;

export const MY_TRICKS_REMOVE_REQUEST = "MY_TRICKS_REMOVE_REQUEST" as const;
export const MY_TRICKS_REMOVE_SUCCESS = "MY_TRICKS_REMOVE_SUCCESS" as const;
export const MY_TRICKS_REMOVE_ERROR = "MY_TRICKS_REMOVE_ERROR" as const;

export type MyTricksInitiateAction =
	| { type: typeof MY_TRICKS_INITIATE_REQUEST }
	| { type: typeof MY_TRICKS_INITIATE_SUCCESS; payload: UserTrick[] }
	| { type: typeof MY_TRICKS_INITIATE_ERROR; payload: string };

export type MyTricksAddAction =
	| { type: typeof MY_TRICKS_ADD_REQUEST }
	| { type: typeof MY_TRICKS_ADD_SUCCESS; payload: UserTrick }
	| { type: typeof MY_TRICKS_ADD_ERROR; payload: string };

export type MyTricksRemoveAction =
	| { type: typeof MY_TRICKS_REMOVE_REQUEST }
	| { type: typeof MY_TRICKS_REMOVE_SUCCESS; payload: string }
	| { type: typeof MY_TRICKS_REMOVE_ERROR; payload: string };

export type MyTricksAction = MyTricksInitiateAction | MyTricksAddAction | MyTricksRemoveAction;
