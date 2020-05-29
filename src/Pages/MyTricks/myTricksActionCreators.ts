import { MyTrick } from "../Tricks/Trick/TrickTypes";

export const MY_TRICK_ADD = "MY_TRICK_ADD" as const;
export const MY_TRICKS_INITIATE = "MY_TRICKS_INITIATE" as const;
export const MY_TRICK_REMOVE = "MY_TRICK_REMOVE" as const;

export type MyTricksAction =
	| { type: typeof MY_TRICK_ADD; payload: MyTrick }
	| { type: typeof MY_TRICKS_INITIATE; payload: MyTrick[] }
	| { type: typeof MY_TRICK_REMOVE; payload: number };

export const addMyTrick = (trick: MyTrick): MyTricksAction => ({
	type: MY_TRICK_ADD,
	payload: trick,
});

export const removeMyTrick = (id: number): MyTricksAction => ({
	type: MY_TRICK_REMOVE,
	payload: id,
});

export const initiateMyTricks = (tricks: MyTrick[]) => ({
	type: MY_TRICKS_INITIATE,
	payload: tricks,
});
