import { LibraryTrick } from "./Trick/TrickTypes";

const actionTypes = {
	TRICKS_INITIATE_REQUEST: "TRICKS_INITIATE_REQUEST",
	TRICKS_INITIATE_SUCCESS: "TRICKS_INITIATE_SUCCESS",
	TRICKS_INITIATE_ERROR: "TRICKS_INITIATE_ERROR",
} as const;

export type TricksAction =
	| { type: typeof actionTypes.TRICKS_INITIATE_REQUEST }
	| { type: typeof actionTypes.TRICKS_INITIATE_SUCCESS; payload: LibraryTrick[] }
	| { type: typeof actionTypes.TRICKS_INITIATE_ERROR; payload: string };

export default actionTypes;
