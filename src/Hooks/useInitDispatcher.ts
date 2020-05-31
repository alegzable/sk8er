import { Dispatch, useEffect } from "react";
import { useDispatch } from "react-redux";

const useInitDispatcher = (...toDispatch: (() => void)[]): Dispatch<any> => {
	const dispatch = useDispatch();

	useEffect(() => {
		toDispatch.forEach((func) => {
			dispatch(func());
		});
	}, [dispatch]);

	return dispatch;
};

export default useInitDispatcher;
