import localStorageDataService from "../../../Services/LocalStorageDataService";
import { Dispatch } from "react";
import {
	PRACTICE_DAYS_ADD_REQUEST,
	PRACTICE_DAYS_ADD_SUCCESS,
	PRACTICE_DAYS_REMOVE_REQUEST,
	PRACTICE_DAYS_REMOVE_SUCCESS,
	PracticeDaysAddAction,
	PracticeDaysRemoveAction,
	PracticeDaysInitiateAction,
	PRACTICE_DAYS_INITIATE_REQUEST,
	PRACTICE_DAYS_INITIATE_SUCCESS,
	PRACTICE_DAYS_UPDATE_REQUEST,
	PracticeDaysUpdateAction,
	PRACTICE_DAYS_UPDATE_SUCCESS,
} from "./practiceDaysActionTypes";
import CalendarDate from "./Calendar/CalendarDate";

export const getUserPracticeDaysAsync = (userTrickId: string) => async (
	dispatch: Dispatch<PracticeDaysInitiateAction>
) => {
	dispatch({ type: PRACTICE_DAYS_INITIATE_REQUEST });

	const practiceDays = await localStorageDataService.getPracticeDaysAsync(userTrickId);

	dispatch({ type: PRACTICE_DAYS_INITIATE_SUCCESS, payload: practiceDays });
};

export const addUserPracticeDayAsync = (userTrickId: string, date: CalendarDate) => async (
	dispatch: Dispatch<PracticeDaysAddAction>
) => {
	dispatch({ type: PRACTICE_DAYS_ADD_REQUEST });

	await localStorageDataService.addPracticeDayAsync(userTrickId, date);
	const userPracticeDay = await localStorageDataService.getPracticeDayAsync(userTrickId, date);

	dispatch({ type: PRACTICE_DAYS_ADD_SUCCESS, payload: userPracticeDay });
};

export const updateUserPracticeDayAsync = (userTrickId: string, date: CalendarDate, score?: number) => async (
	dispatch: Dispatch<PracticeDaysUpdateAction>
) => {
	dispatch({ type: PRACTICE_DAYS_UPDATE_REQUEST });

	await localStorageDataService.updateTrickScoreAsync(userTrickId, date, score);
	const userPracticeDay = await localStorageDataService.getPracticeDayAsync(userTrickId, date);

	dispatch({ type: PRACTICE_DAYS_UPDATE_SUCCESS, payload: userPracticeDay });
};

export const removeUserPracticeDayAsync = (id: string) => async (dispatch: Dispatch<PracticeDaysRemoveAction>) => {
	dispatch({ type: PRACTICE_DAYS_REMOVE_REQUEST });

	await localStorageDataService.removePracticeDayAsync(id);

	dispatch({ type: PRACTICE_DAYS_REMOVE_SUCCESS, payload: id });
};
