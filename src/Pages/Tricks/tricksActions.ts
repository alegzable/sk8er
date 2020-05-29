import localStorageDataService from "../../Services/LocalStorageDataService";
import { Dispatch } from "react";
import { TricksAction, initiateTricks } from "./tricksActionCreators";

export const getTricksAsync = () => async (dispatch: Dispatch<TricksAction>) => {
	const tricks = await localStorageDataService.getLibraryTricksAsync();

	dispatch(initiateTricks(tricks));
};
