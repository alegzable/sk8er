import { UserLibraryTrick } from "./Trick/TrickTypes";

export const actions = {
	GET: "GET",
} as const;

export type TricksAction = { type: typeof actions.GET; payload: UserLibraryTrick[] };

export const tricksReducer = (state: UserLibraryTrick[] = [], action: TricksAction) => {
	return state;
};
