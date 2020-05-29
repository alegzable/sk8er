import { LibraryTrick } from "./Trick/TrickTypes";

export const TRICKS_INITIATE = "TRICKS_INITIATE" as const;

export type TricksAction = { type: typeof TRICKS_INITIATE; payload: LibraryTrick[] };

export const initiateTricks = (tricks: LibraryTrick[]) => ({
	type: TRICKS_INITIATE,
	payload: tricks,
});
