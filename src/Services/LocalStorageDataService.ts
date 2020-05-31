import {
	LibraryTrick,
	UserTrick,
	UserTrickPracticeDay,
	UserTrickPracticeDayJSON,
} from "../Pages/Tricks/Trick/TrickTypes";
import CalendarDate from "../Pages/MyTricks/MyTrickDetails/Calendar/CalendarDate";
import { v4 } from "uuid";

const delay = () => {
	return new Promise((resolve) => setTimeout(resolve, 200));
};

export const localStorageKeys = {
	tricks: "TRICKS",
	userTricks: "USER_TRICKS",
	userTrickPracticeDays: "USER_TRICK_PRACTICE_DAYS",
} as const;

export class LocalStorageDataService {
	public updateTrickScoreAsync = async (userTrickId: string, date: CalendarDate, score?: number) => {
		const practiceDays =
			this._getFromStorage<UserTrickPracticeDayJSON[]>(localStorageKeys.userTrickPracticeDays) || [];

		const practiceDay = practiceDays.find(
			(x) => x.userTrickId === userTrickId && new CalendarDate(x.date.year, x.date.month, x.date.day).equals(date)
		);

		if (!practiceDay) {
			const practiceDayToAdd = {
				id: v4(),
				userTrickId,
				date,
				score,
			};
			practiceDays.push(practiceDayToAdd);
		} else {
			practiceDay.score = score;
		}

		this._addToStorage(localStorageKeys.userTrickPracticeDays, practiceDays);
	};

	public getUserTricksAsync = async (): Promise<UserTrick[]> => {
		await delay();

		return this._getFromStorage<UserTrick[]>(localStorageKeys.userTricks) || [];
	};

	public getUserTrickAsync = async (libraryTrickId: string): Promise<UserTrick> => {
		const userTricks = await this.getUserTricksAsync();
		const userTrick = userTricks.find((x) => x.libraryTrickId === libraryTrickId);

		if (userTrick === undefined) {
			throw new Error("Trick not found");
		}

		return userTrick;
	};

	public getPracticeDaysAsync = async (userTrickId: string): Promise<UserTrickPracticeDay[]> => {
		await delay();

		const jsonResult = (
			this._getFromStorage<UserTrickPracticeDayJSON[]>(localStorageKeys.userTrickPracticeDays) ?? []
		).filter((x) => x.userTrickId === userTrickId);

		return jsonResult.map((x) => ({
			...x,
			date: new CalendarDate(x.date.year, x.date.month, x.date.day),
		}));
	};

	public getPracticeDayAsync = async (userTrickId: string, date: CalendarDate): Promise<UserTrickPracticeDay> => {
		await delay();

		const userTrickPracticeDays =
			this._getFromStorage<UserTrickPracticeDayJSON[]>(localStorageKeys.userTrickPracticeDays) ?? [];

		const jsonResult = userTrickPracticeDays.find(
			(x) => x.userTrickId === userTrickId && new CalendarDate(x.date.year, x.date.month, x.date.day).equals(date)
		);

		if (jsonResult === undefined) {
			throw new Error("Practice day not found");
		}

		return {
			...jsonResult,
			date,
		};
	};

	public addPracticeDayAsync = async (userTrickId: string, date: CalendarDate) => {
		await delay();

		const userTrickPracticeDays =
			this._getFromStorage<UserTrickPracticeDayJSON[]>(localStorageKeys.userTrickPracticeDays) ?? [];

		const alreadyAdded = userTrickPracticeDays.some(
			(x) => x.userTrickId === userTrickId && new CalendarDate(x.date.year, x.date.month, x.date.day).equals(date)
		);

		if (alreadyAdded) {
			return;
		}

		const practiceDayToAdd = {
			id: v4(),
			userTrickId,
			date,
		};

		userTrickPracticeDays.push(practiceDayToAdd);

		this._addToStorage(localStorageKeys.userTrickPracticeDays, userTrickPracticeDays);
	};

	public removePracticeDayAsync = async (id: string) => {
		const userTrickPracticeDays =
			this._getFromStorage<UserTrickPracticeDayJSON[]>(localStorageKeys.userTrickPracticeDays) ?? [];
		const dayToRemoveIndex = userTrickPracticeDays.findIndex((x) => x.id === id);

		if (dayToRemoveIndex === -1) {
			return;
		}

		userTrickPracticeDays.splice(dayToRemoveIndex, 1);
		this._addToStorage(localStorageKeys.userTrickPracticeDays, userTrickPracticeDays);
	};

	public getLibraryTricksAsync = async (): Promise<LibraryTrick[]> => {
		await delay();

		return this._getFromStorage<LibraryTrick[]>(localStorageKeys.tricks) || [];
	};

	public addToUserTricksAsync = async (libraryTrickId: string) => {
		await delay();

		const userTricks = this._getFromStorage<UserTrick[]>(localStorageKeys.userTricks) ?? [];
		const alreadyAdded = userTricks.findIndex((x) => x.libraryTrickId === libraryTrickId) !== -1;

		if (alreadyAdded) {
			return;
		}

		const trickToAdd = this._getFromStorage<LibraryTrick[]>(localStorageKeys.tricks)?.find(
			(x) => x.id === libraryTrickId
		);

		if (trickToAdd === undefined) {
			throw new Error("Trick does not exist");
		}

		const userTrick = { id: v4(), libraryTrickId };

		userTricks.push(userTrick);

		this._addToStorage(localStorageKeys.userTricks, userTricks);
	};

	public removeFromUserTricksAsync = async (libraryTrickId: string) => {
		await delay();

		const userTricks = this._getFromStorage<UserTrick[]>(localStorageKeys.userTricks) ?? [];
		const trickToRemoveIndex = userTricks.findIndex((x) => x.libraryTrickId === libraryTrickId);

		if (trickToRemoveIndex === -1) {
			return;
		}

		userTricks.splice(trickToRemoveIndex, 1);
		this._addToStorage(localStorageKeys.userTricks, userTricks);
	};

	public initiateTricksLibrary = (tricks: LibraryTrick[]) => {
		const shouldInitiate = this._getFromStorage<LibraryTrick[]>(localStorageKeys.tricks) === null;

		if (shouldInitiate) {
			this._addToStorage(localStorageKeys.tricks, tricks);
		}
	};

	private _getFromStorage<T>(key: string): T | undefined {
		const json = localStorage.getItem(key);

		if (json === null) {
			return undefined;
		}

		return JSON.parse(json);
	}

	private _addToStorage(key: string, value: any) {
		localStorage.setItem(key, JSON.stringify(value));
	}
}

const localStorageDataService = new LocalStorageDataService();

export default localStorageDataService;
