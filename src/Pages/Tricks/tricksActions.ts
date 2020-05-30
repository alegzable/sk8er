import localStorageDataService from "../../Services/LocalStorageDataService";
import { Dispatch } from "react";
import { TricksAction, TRICKS_INITIATE_REQUEST, TRICKS_INITIATE_SUCCESS } from "./tricksActionTypes";

export const getTricksAsync = () => async (dispatch: Dispatch<TricksAction>) => {
	dispatch({ type: TRICKS_INITIATE_REQUEST });

	const tricks = await localStorageDataService.getLibraryTricksAsync();

	dispatch({ type: TRICKS_INITIATE_SUCCESS, payload: tricks });
};
