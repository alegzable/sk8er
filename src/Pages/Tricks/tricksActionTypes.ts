import { LibraryTrick } from "./Trick/TrickTypes";

export const TRICKS_INITIATE_REQUEST = "TRICKS_INITIATE_REQUEST" as const;
export const TRICKS_INITIATE_SUCCESS = "TRICKS_INITIATE_SUCCESS" as const;
export const TRICKS_INITIATE_ERROR = "TRICKS_INITIATE_ERROR" as const;

export type TricksAction =
	| { type: typeof TRICKS_INITIATE_REQUEST }
	| { type: typeof TRICKS_INITIATE_SUCCESS; payload: LibraryTrick[] }
	| { type: typeof TRICKS_INITIATE_ERROR; payload: string };
