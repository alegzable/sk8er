import localStorageDataService from "../../Services/LocalStorageDataService";
import { Dispatch } from "react";
import actionTypes, { TricksAction } from "./tricksActionTypes";

export const getTricksAsync = () => async (dispatch: Dispatch<TricksAction>) => {
	dispatch({ type: actionTypes.TRICKS_INITIATE_REQUEST });

	const tricks = await localStorageDataService.getLibraryTricksAsync();

	dispatch({ type: actionTypes.TRICKS_INITIATE_SUCCESS, payload: tricks });
};
