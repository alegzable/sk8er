import localStorageDataService from "../../Services/LocalStorageDataService";
import { Dispatch } from "react";
import {
	MY_TRICKS_ADD_SUCCESS,
	MY_TRICKS_REMOVE_SUCCESS,
	MY_TRICKS_INITIATE_SUCCESS,
	MY_TRICKS_INITIATE_REQUEST,
	MY_TRICKS_ADD_REQUEST,
	MY_TRICKS_REMOVE_REQUEST,
	MyTricksInitiateAction,
	MyTricksAddAction,
	MyTricksRemoveAction,
} from "./myTricksActionTypes";

export const getMyTricksAsync = () => async (dispatch: Dispatch<MyTricksInitiateAction>) => {
	dispatch({ type: MY_TRICKS_INITIATE_REQUEST });

	const myTricks = await localStorageDataService.getMyTricksAsync();

	dispatch({
		type: MY_TRICKS_INITIATE_SUCCESS,
		payload: myTricks,
	});
};

export const addMyTrickAsync = (libraryTrickId: string) => async (dispatch: Dispatch<MyTricksAddAction>) => {
	dispatch({ type: MY_TRICKS_ADD_REQUEST });

	await localStorageDataService.addToMyTricksAsync(libraryTrickId);
	const myTrick = await localStorageDataService.getMyTrickAsync(libraryTrickId);

	dispatch({
		type: MY_TRICKS_ADD_SUCCESS,
		payload: myTrick,
	});
};

export const removeTrickAsync = (libraryTrickId: string) => async (dispatch: Dispatch<MyTricksRemoveAction>) => {
	dispatch({ type: MY_TRICKS_REMOVE_REQUEST });

	await localStorageDataService.removeFromMyTricksAsync(libraryTrickId);

	dispatch({
		type: MY_TRICKS_REMOVE_SUCCESS,
		payload: libraryTrickId,
	});
};
