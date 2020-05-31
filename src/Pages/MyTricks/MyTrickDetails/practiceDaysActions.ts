import localStorageDataService from "../../../Services/LocalStorageDataService";
import { Dispatch } from "react";
import actionTypes, {
	PracticeDaysAddAction,
	PracticeDaysRemoveAction,
	PracticeDaysInitiateAction,
	PracticeDaysUpdateAction,
} from "./practiceDaysActionTypes";
import CalendarDate from "./Calendar/CalendarDate";

export const getUserPracticeDaysAsync = (userTrickId: string) => async (
	dispatch: Dispatch<PracticeDaysInitiateAction>
) => {
	dispatch({ type: actionTypes.PRACTICE_DAYS_INITIATE_REQUEST });

	const practiceDays = await localStorageDataService.getPracticeDaysAsync(userTrickId);

	dispatch({ type: actionTypes.PRACTICE_DAYS_INITIATE_SUCCESS, payload: practiceDays });
};

export const addUserPracticeDayAsync = (userTrickId: string, date: CalendarDate) => async (
	dispatch: Dispatch<PracticeDaysAddAction>
) => {
	dispatch({ type: actionTypes.PRACTICE_DAYS_ADD_REQUEST });

	await localStorageDataService.addPracticeDayAsync(userTrickId, date);
	const userPracticeDay = await localStorageDataService.getPracticeDayAsync(userTrickId, date);

	dispatch({ type: actionTypes.PRACTICE_DAYS_ADD_SUCCESS, payload: userPracticeDay });
};

export const updateUserPracticeDayAsync = (userTrickId: string, date: CalendarDate, score?: number) => async (
	dispatch: Dispatch<PracticeDaysUpdateAction>
) => {
	dispatch({ type: actionTypes.PRACTICE_DAYS_UPDATE_REQUEST });

	await localStorageDataService.updateTrickScoreAsync(userTrickId, date, score);
	const userPracticeDay = await localStorageDataService.getPracticeDayAsync(userTrickId, date);

	dispatch({ type: actionTypes.PRACTICE_DAYS_UPDATE_SUCCESS, payload: userPracticeDay });
};

export const removeUserPracticeDayAsync = (id: string) => async (dispatch: Dispatch<PracticeDaysRemoveAction>) => {
	dispatch({ type: actionTypes.PRACTICE_DAYS_REMOVE_REQUEST });

	await localStorageDataService.removePracticeDayAsync(id);

	dispatch({ type: actionTypes.PRACTICE_DAYS_REMOVE_SUCCESS, payload: id });
};
