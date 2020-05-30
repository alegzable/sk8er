import localStorageDataService from "../../Services/LocalStorageDataService";
import { Dispatch } from "react";
import { TricksAction, initiateTricks, TRICKS_INITIATE_REQUEST, TRICKS_INITIATE_SUCCESS } from "./tricksActionCreators";

export const getTricksAsync = () => async (dispatch: Dispatch<TricksAction>) => {
	dispatch(initiateTricks(TRICKS_INITIATE_REQUEST));

	const tricks = await localStorageDataService.getLibraryTricksAsync();

	dispatch(initiateTricks(TRICKS_INITIATE_SUCCESS, tricks));

	// error
	// dispatch(initiateTricks(TRICKS_INITIATE_ERROR, error)
};
