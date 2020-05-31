import localStorageDataService from "../../Services/LocalStorageDataService";
import { Dispatch } from "react";
import actionTypes, { TricksAction } from "./tricksActionTypes";

export const loadTricksAsync = () => async (dispatch: Dispatch<TricksAction>) => {
	dispatch({ type: actionTypes.TRICKS_LOAD_REQUEST });

	const tricks = await localStorageDataService.getLibraryTricksAsync();

	dispatch({ type: actionTypes.TRICKS_LOAD_SUCCESS, payload: tricks });
};
