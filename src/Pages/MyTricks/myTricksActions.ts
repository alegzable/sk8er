import localStorageDataService from "../../Services/LocalStorageDataService";
import { Dispatch } from "react";
import { MyTricksAction, addMyTrick, initiateMyTricks, removeMyTrick } from "./myTricksActionCreators";

export const addMyTrickAsync = (id: number) => async (dispatch: Dispatch<MyTricksAction>) => {
	await localStorageDataService.addToMyTricksAsync(id);
	const myTrick = await localStorageDataService.getMyTrickAsync(id);

	dispatch(addMyTrick(myTrick));
};

export const getMyTricksAsync = () => async (dispatch: Dispatch<MyTricksAction>) => {
	const myTricks = await localStorageDataService.getMyTricksAsync();

	dispatch(initiateMyTricks(myTricks));
};

export const removeTrickAsync = (id: number) => async (dispatch: Dispatch<MyTricksAction>) => {
	await localStorageDataService.removeFromMyTricksAsync(id);

	dispatch(removeMyTrick(id));
};
