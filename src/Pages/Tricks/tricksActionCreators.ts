import { LibraryTrick } from "./Trick/TrickTypes";

export const TRICKS_ADD = "TRICKS_ADD" as const;

export type TricksAction = { type: typeof TRICKS_ADD; payload: LibraryTrick[] };

export const addTricks = (tricks: LibraryTrick[]) => ({
	type: TRICKS_ADD,
	payload: tricks,
});
