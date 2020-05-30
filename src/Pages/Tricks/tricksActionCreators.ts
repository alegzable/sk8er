import { LibraryTrick } from "./Trick/TrickTypes";

export const TRICKS_INITIATE_REQUEST = "TRICKS_INITIATE_REQUEST" as const;
export const TRICKS_INITIATE_SUCCESS = "TRICKS_INITIATE_SUCCESS" as const;
export const TRICKS_INITIATE_ERROR = "TRICKS_INITIATE_ERROR" as const;

export type TricksAction =
	| { type: typeof TRICKS_INITIATE_REQUEST }
	| { type: typeof TRICKS_INITIATE_SUCCESS; payload: LibraryTrick[] }
	| { type: typeof TRICKS_INITIATE_ERROR; payload: string };

export const initiateTricks = (
	type: typeof TRICKS_INITIATE_REQUEST | typeof TRICKS_INITIATE_SUCCESS | typeof TRICKS_INITIATE_ERROR,
	tricks?: LibraryTrick[],
	error?: string
): TricksAction => {
	switch (type) {
		case TRICKS_INITIATE_REQUEST:
			return {
				type,
			};
		case TRICKS_INITIATE_SUCCESS:
			return {
				type,
				payload: tricks as LibraryTrick[],
			};
		case TRICKS_INITIATE_ERROR:
			return {
				type,
				payload: error as string,
			};
	}
};
