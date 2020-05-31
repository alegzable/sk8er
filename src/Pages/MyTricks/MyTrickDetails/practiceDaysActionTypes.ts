import { UserTrickPracticeDay } from "../../Tricks/Trick/TrickTypes";

const actionTypes = {
	PRACTICE_DAYS_INITIATE_REQUEST: "PRACTICE_DAYS_INITIATE_REQUEST",
	PRACTICE_DAYS_INITIATE_SUCCESS: "PRACTICE_DAYS_INITIATE_SUCCESS",
	PRACTICE_DAYS_INITIATE_ERROR: "PRACTICE_DAYS_INITIATE_ERROR",

	PRACTICE_DAYS_ADD_REQUEST: "PRACTICE_DAYS_ADD_REQUEST",
	PRACTICE_DAYS_ADD_SUCCESS: "PRACTICE_DAYS_ADD_SUCCESS",
	PRACTICE_DAYS_ADD_ERROR: "PRACTICE_DAYS_ADD_ERROR",

	PRACTICE_DAYS_UPDATE_REQUEST: "PRACTICE_DAYS_UPDATE_REQUEST",
	PRACTICE_DAYS_UPDATE_SUCCESS: "PRACTICE_DAYS_UPDATE_SUCCESS",
	PRACTICE_DAYS_UPDATE_ERROR: "PRACTICE_DAYS_UPDATE_ERROR",

	PRACTICE_DAYS_REMOVE_REQUEST: "PRACTICE_DAYS_REMOVE_REQUEST",
	PRACTICE_DAYS_REMOVE_SUCCESS: "PRACTICE_DAYS_REMOVE_SUCCESS",
	PRACTICE_DAYS_REMOVE_ERROR: "PRACTICE_DAYS_REMOVE_ERROR",
} as const;

export type PracticeDaysInitiateAction =
	| { type: typeof actionTypes.PRACTICE_DAYS_INITIATE_REQUEST }
	| { type: typeof actionTypes.PRACTICE_DAYS_INITIATE_SUCCESS; payload: UserTrickPracticeDay[] }
	| { type: typeof actionTypes.PRACTICE_DAYS_INITIATE_ERROR; payload: string };

export type PracticeDaysUpdateAction =
	| { type: typeof actionTypes.PRACTICE_DAYS_UPDATE_REQUEST }
	| { type: typeof actionTypes.PRACTICE_DAYS_UPDATE_SUCCESS; payload: UserTrickPracticeDay }
	| { type: typeof actionTypes.PRACTICE_DAYS_UPDATE_ERROR; payload: string };

export type PracticeDaysAddAction =
	| { type: typeof actionTypes.PRACTICE_DAYS_ADD_REQUEST }
	| { type: typeof actionTypes.PRACTICE_DAYS_ADD_SUCCESS; payload: UserTrickPracticeDay }
	| { type: typeof actionTypes.PRACTICE_DAYS_ADD_ERROR; payload: string };

export type PracticeDaysRemoveAction =
	| { type: typeof actionTypes.PRACTICE_DAYS_REMOVE_REQUEST }
	| { type: typeof actionTypes.PRACTICE_DAYS_REMOVE_SUCCESS; payload: string }
	| { type: typeof actionTypes.PRACTICE_DAYS_REMOVE_ERROR; payload: string };

export type PracticeDaysAction =
	| PracticeDaysInitiateAction
	| PracticeDaysAddAction
	| PracticeDaysUpdateAction
	| PracticeDaysRemoveAction;

export default actionTypes;
