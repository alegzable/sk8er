import {
	UserLibraryTrick,
	LibraryTrick,
	MyTrick,
	MyTrickJSON,
	MyTrickScores,
	MyTrickScoresJSON,
} from "../Pages/Tricks/Trick/TrickTypes";
import CalendarDate from "../Pages/MyTricks/MyTrickDetails/Calendar/CalendarDate";
import DailyScore from "../Pages/MyTricks/MyTrickDetails/Score/DailyScore";

export const localStorageKeys = {
	tricks: "TRICKS",
	myTricks: "MY_TRICKS",
	scores: "SCORES",
} as const;

export class LocalStorageDataService {
	public getTrickScore = (id: number, date: CalendarDate): DailyScore | undefined => {
		const trickScores = this.getTrickScores(id);

		return trickScores?.scores?.find((x) => x.date.equals(date));
	};

	public getTrickScores = (id: number): MyTrickScores | undefined => {
		const tricksScores = this._getTricksScores();
		return tricksScores.find((x) => x.id === id);
	};

	public updateTrickScore = (id: number, score: DailyScore) => {
		if (score.date === undefined || score.value === undefined) {
			throw new Error("Invalid date or value");
		}

		const tricksScores = this._getTricksScores();
		const trickScores = tricksScores.find((x) => x.id === id);

		if (!trickScores) {
			tricksScores.push({ id: id, scores: [score] });
		} else {
			const dailyScore = trickScores.scores.find((x) => x.date.equals(score.date));

			if (!dailyScore) {
				trickScores.scores.push(score);
			} else {
				dailyScore.value = score.value;
			}
		}

		this._addToStorage(localStorageKeys.scores, tricksScores);
	};

	public getMyTricks = (): MyTrick[] => {
		const myTricksJSON = this._getFromStorage<MyTrickJSON[]>(localStorageKeys.myTricks) || [];

		return myTricksJSON.map((x) => {
			return {
				id: x.id,
				name: x.name,
				videoUrl: x.videoUrl,
				practiceDates: x.practiceDates.map(
					(practiceDay) => new CalendarDate(practiceDay.year, practiceDay.month, practiceDay.day)
				),
			};
		});
	};

	public getMyTrick = (id?: number): MyTrick | undefined => {
		if (!id) {
			return undefined;
		}

		const myTricks = this.getMyTricks();
		return myTricks.find((x) => x.id === id);
	};

	public addPracticeDay = (id: number, date: CalendarDate) => {
		const myTricks = this.getMyTricks();
		const trick = myTricks.find((x) => x.id === id);

		if (!trick) {
			return;
		}

		const alreadyAdded = trick.practiceDates.findIndex((x) => x.equals(date)) !== -1;

		if (alreadyAdded) {
			return;
		}

		trick.practiceDates.push(date);

		this._addToStorage(localStorageKeys.myTricks, myTricks);
	};

	public removePracticeDay = (id: number, date: CalendarDate) => {
		const myTricks = this.getMyTricks();
		const trick = myTricks.find((x) => x.id === id);

		if (!trick) {
			return;
		}

		const dayToRemoveIndex = trick.practiceDates.findIndex((x) => x.equals(date));

		if (dayToRemoveIndex === -1) {
			return;
		}

		trick.practiceDates.splice(dayToRemoveIndex, 1);

		this._addToStorage(localStorageKeys.myTricks, myTricks);
	};

	public getUserLibraryTricks = (): UserLibraryTrick[] => {
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

	public addToMyTricks = (id: number) => {
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

	public removeFromMyTricks = (id: number) => {
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

	private _getTricksScores = (): MyTrickScores[] => {
		const myTrickScoresJSON = this._getFromStorage<MyTrickScoresJSON[]>(localStorageKeys.scores) || [];
		return myTrickScoresJSON.map((x) => {
			return {
				id: x.id,
				scores: x.scores.map(
					(score) =>
						new DailyScore(new CalendarDate(score.date.year, score.date.month, score.date.day), score.value)
				),
			};
		});
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
