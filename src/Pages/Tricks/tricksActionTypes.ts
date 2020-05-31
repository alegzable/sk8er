import { LibraryTrick } from "./Trick/TrickTypes";

const actionTypes = {
	TRICKS_LOAD_REQUEST: "TRICKS_LOAD_REQUEST",
	TRICKS_LOAD_SUCCESS: "TRICKS_LOAD_SUCCESS",
	TRICKS_LOAD_ERROR: "TRICKS_LOAD_ERROR",
} as const;

export type TricksAction =
	| { type: typeof actionTypes.TRICKS_LOAD_REQUEST }
	| { type: typeof actionTypes.TRICKS_LOAD_SUCCESS; payload: LibraryTrick[] }
	| { type: typeof actionTypes.TRICKS_LOAD_ERROR; payload: string };

export default actionTypes;
