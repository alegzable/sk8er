import localStorageDataService from "../../Services/LocalStorageDataService";
import { Dispatch } from "react";
import actionTypes, { MyTricksLoadAction, MyTricksAddAction, MyTricksRemoveAction } from "./myTricksActionTypes";

export const loadMyTricksAsync = () => async (dispatch: Dispatch<MyTricksLoadAction>) => {
	dispatch({ type: actionTypes.MY_TRICKS_LOAD_REQUEST });

	const myTricks = await localStorageDataService.getMyTricksAsync();

	dispatch({
		type: actionTypes.MY_TRICKS_LOAD_SUCCESS,
		payload: myTricks,
	});
};

export const addMyTrickAsync = (libraryTrickId: string) => async (dispatch: Dispatch<MyTricksAddAction>) => {
	dispatch({ type: actionTypes.MY_TRICKS_ADD_REQUEST });

	await localStorageDataService.addToMyTricksAsync(libraryTrickId);
	const myTrick = await localStorageDataService.getMyTrickAsync(libraryTrickId);

	dispatch({
		type: actionTypes.MY_TRICKS_ADD_SUCCESS,
		payload: myTrick,
	});
};

export const removeTrickAsync = (libraryTrickId: string) => async (dispatch: Dispatch<MyTricksRemoveAction>) => {
	dispatch({ type: actionTypes.MY_TRICKS_REMOVE_REQUEST });

	await localStorageDataService.removeFromMyTricksAsync(libraryTrickId);

	dispatch({
		type: actionTypes.MY_TRICKS_REMOVE_SUCCESS,
		payload: libraryTrickId,
	});
};
