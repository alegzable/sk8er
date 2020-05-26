import { UserLibraryTrick, LibraryTrick, MyTrick, MyTrickJSON } from "../Pages/Tricks/Trick/TrickTypes";
import CalendarDate from "../Pages/MyTricks/MyTrickDetails/Calendar/CalendarDate";
import PracticeDate from "../Pages/MyTricks/MyTrickDetails/Score/DailyScore";

const delay = () => {
	return new Promise((resolve) => setTimeout(resolve, 200));
};

export const localStorageKeys = {
	tricks: "TRICKS",
	myTricks: "MY_TRICKS",
} as const;

export class LocalStorageDataService {
	public updateTrickScoreAsync = async (id: number, score: PracticeDate) => {
		if (score.date === undefined || score.score === undefined) {
			throw new Error("Invalid date or value");
		}

		const myTricks = await this.getMyTricksAsync();
		const myTrick = myTricks.find((x) => x.id === id);

		if (myTrick === undefined) {
			throw new Error("Trick not found");
		}

		const practiceDates = myTrick.practiceDates;
		const practiceDate = practiceDates.find((x) => x.date.equals(score.date));

		if (!practiceDate) {
			practiceDates.push(score);
		} else {
			practiceDate.score = score.score;
		}

		this._addToStorage(localStorageKeys.myTricks, myTricks);
	};

	public getMyTricksAsync = async (): Promise<MyTrick[]> => {
		await delay();

		const myTricksJSON = this._getFromStorage<MyTrickJSON[]>(localStorageKeys.myTricks) || [];

		return myTricksJSON.map((x) => {
			return {
				id: x.id,
				name: x.name,
				videoUrl: x.videoUrl,
				practiceDates: x.practiceDates
					.map((practiceDay) => {
						return new PracticeDate(
							new CalendarDate(practiceDay.date.year, practiceDay.date.month, practiceDay.date.day),
							practiceDay.score
						);
					})
					.sort((date1: PracticeDate, date2: PracticeDate) => date1.date.compare(date2.date)),
			};
		});
	};

	public getMyTrickAsync = async (id?: number): Promise<MyTrick> => {
		if (!id) {
			throw new Error("Trick not found");
		}

		const myTricks = await this.getMyTricksAsync();
		const myTrick = myTricks.find((x) => x.id === id);

		if (myTrick === undefined) {
			throw new Error("Trick not found");
		}

		return myTrick;
	};

	public addPracticeDayAsync = async (id: number, date: CalendarDate) => {
		const myTricks = await this.getMyTricksAsync();
		const trick = myTricks.find((x) => x.id === id);

		if (!trick) {
			return;
		}

		const alreadyAdded = trick.practiceDates.findIndex((x) => x.date.equals(date)) !== -1;

		if (alreadyAdded) {
			return;
		}

		trick.practiceDates.push(new PracticeDate(date));

		this._addToStorage(localStorageKeys.myTricks, myTricks);
	};

	public removePracticeDayAsync = async (id: number, date: CalendarDate) => {
		const myTricks = await this.getMyTricksAsync();
		const trick = myTricks.find((x) => x.id === id);

		if (!trick) {
			return;
		}

		const dayToRemoveIndex = trick.practiceDates.findIndex((x) => x.date.equals(date));

		if (dayToRemoveIndex === -1) {
			return;
		}

		trick.practiceDates.splice(dayToRemoveIndex, 1);

		this._addToStorage(localStorageKeys.myTricks, myTricks);
	};

	public getUserLibraryTricksAsync = async (): Promise<UserLibraryTrick[]> => {
		await delay();

		const libraryTricks = this._getFromStorage<LibraryTrick[]>(localStorageKeys.tricks);
		const myTricks = this._getFromStorage<MyTrick[]>(localStorageKeys.myTricks);

		if (libraryTricks === null) {
			return [];
		}

		const myTrickIds = myTricks?.map((x) => x.id);

		const userLibraryTricks = libraryTricks.map((libraryTrick) => {
			const addedToMyTricks = myTrickIds?.includes(libraryTrick.id) ?? false;

			return {
				...libraryTrick,
				addedToMyTricks,
			};
		});

		return userLibraryTricks;
	};

	public addToMyTricksAsync = async (id: number) => {
		await delay();

		const myTricks = this._getFromStorage<MyTrick[]>(localStorageKeys.myTricks) ?? [];
		const alreadyAdded = myTricks.findIndex((x) => x.id === id) !== -1;

		if (alreadyAdded) {
			return;
		}

		const trickToAdd = this._getFromStorage<LibraryTrick[]>(localStorageKeys.tricks)?.find((x) => x.id === id);

		if (trickToAdd === undefined) {
			throw new Error("Trick does not exist");
		}

		(trickToAdd as MyTrick).practiceDates = [];

		myTricks.push(trickToAdd as MyTrick);

		this._addToStorage(localStorageKeys.myTricks, myTricks);
	};

	public removeFromMyTricksAsync = async (id: number) => {
		await delay();

		const myTricks = this._getFromStorage<MyTrick[]>(localStorageKeys.myTricks) ?? [];
		const trickToRemoveIndex = myTricks.findIndex((x) => x.id === id);

		if (trickToRemoveIndex === -1) {
			return;
		}

		myTricks.splice(trickToRemoveIndex, 1);
		this._addToStorage(localStorageKeys.myTricks, myTricks);
	};

	public initiateTricksLibrary = (tricks: LibraryTrick[]) => {
		const shouldInitiate = this._getFromStorage<LibraryTrick[]>(localStorageKeys.tricks) === null;

		if (shouldInitiate) {
			this._addToStorage(localStorageKeys.tricks, tricks);
		}
	};

	private _getFromStorage<T>(key: string): T | null {
		const json = localStorage.getItem(key);

		if (json === null) {
			return null;
		}

		return JSON.parse(json);
	}

	private _addToStorage(key: string, value: any) {
		localStorage.setItem(key, JSON.stringify(value));
	}
}

const localStorageDataService = new LocalStorageDataService();

export default localStorageDataService;
