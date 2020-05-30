import { UserTrickPracticeDay } from "../../Tricks/Trick/TrickTypes";

export const PRACTICE_DAYS_INITIATE_REQUEST = "PRACTICE_DAYS_INITIATE_REQUEST" as const;
export const PRACTICE_DAYS_INITIATE_SUCCESS = "PRACTICE_DAYS_INITIATE_SUCCESS" as const;
export const PRACTICE_DAYS_INITIATE_ERROR = "PRACTICE_DAYS_INITIATE_ERROR" as const;

export const PRACTICE_DAYS_ADD_REQUEST = "PRACTICE_DAYS_ADD_REQUEST" as const;
export const PRACTICE_DAYS_ADD_SUCCESS = "PRACTICE_DAYS_ADD_SUCCESS" as const;
export const PRACTICE_DAYS_ADD_ERROR = "PRACTICE_DAYS_ADD_ERROR" as const;

export const PRACTICE_DAYS_UPDATE_REQUEST = "PRACTICE_DAYS_UPDATE_REQUEST" as const;
export const PRACTICE_DAYS_UPDATE_SUCCESS = "PRACTICE_DAYS_UPDATE_SUCCESS" as const;
export const PRACTICE_DAYS_UPDATE_ERROR = "PRACTICE_DAYS_UPDATE_ERROR" as const;

export const PRACTICE_DAYS_REMOVE_REQUEST = "PRACTICE_DAYS_REMOVE_REQUEST" as const;
export const PRACTICE_DAYS_REMOVE_SUCCESS = "PRACTICE_DAYS_REMOVE_SUCCESS" as const;
export const PRACTICE_DAYS_REMOVE_ERROR = "PRACTICE_DAYS_REMOVE_ERROR" as const;

export type PracticeDaysInitiateAction =
	| { type: typeof PRACTICE_DAYS_INITIATE_REQUEST }
	| { type: typeof PRACTICE_DAYS_INITIATE_SUCCESS; payload: UserTrickPracticeDay[] }
	| { type: typeof PRACTICE_DAYS_INITIATE_ERROR; payload: string };

export type PracticeDaysUpdateAction =
	| { type: typeof PRACTICE_DAYS_UPDATE_REQUEST }
	| { type: typeof PRACTICE_DAYS_UPDATE_SUCCESS; payload: UserTrickPracticeDay }
	| { type: typeof PRACTICE_DAYS_UPDATE_ERROR; payload: string };

export type PracticeDaysAddAction =
	| { type: typeof PRACTICE_DAYS_ADD_REQUEST }
	| { type: typeof PRACTICE_DAYS_ADD_SUCCESS; payload: UserTrickPracticeDay }
	| { type: typeof PRACTICE_DAYS_ADD_ERROR; payload: string };

export type PracticeDaysRemoveAction =
	| { type: typeof PRACTICE_DAYS_REMOVE_REQUEST }
	| { type: typeof PRACTICE_DAYS_REMOVE_SUCCESS; payload: string }
	| { type: typeof PRACTICE_DAYS_REMOVE_ERROR; payload: string };

export type PracticeDaysAction =
	| PracticeDaysInitiateAction
	| PracticeDaysAddAction
	| PracticeDaysUpdateAction
	| PracticeDaysRemoveAction;
