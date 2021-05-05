import { Dispatch, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadMyTricksAsync } from "../Pages/MyTricks/myTricksActions";
import { loadTricksAsync } from "../Pages/Tricks/tricksActions";


const useInitDispatcher = (): Dispatch<unknown> => {
	const dispatch = useDispatch();

	useEffect(() => {

	async function loadAsync(){
		await loadTricksAsync(dispatch)
		await loadMyTricksAsync(dispatch);
	}

	loadAsync();
	
	}, [dispatch]);

	return dispatch;
};

export default useInitDispatcher;
