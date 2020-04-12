import { UserLibraryTrick, LibraryTrick, MyTrick } from "../Pages/Tricks/Trick/TrickTypes";

export const localStorageKeys = {
	tricks: "TRICKS",
	myTricks: "MY_TRICKS",
} as const;

export class LocalStorageDataService {
	public getMyTricks = (): MyTrick[] => {
		return this.getFromStorage<MyTrick[]>(localStorageKeys.myTricks) || [];
	};

	public getUserLibraryTricks = (): UserLibraryTrick[] => {
		const libraryTricks = this.getFromStorage<LibraryTrick[]>(localStorageKeys.tricks);
		const myTricks = this.getFromStorage<MyTrick[]>(localStorageKeys.myTricks);

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
		const myTricks = this.getFromStorage<MyTrick[]>(localStorageKeys.myTricks) ?? [];
		const alreadyAdded = myTricks.findIndex((x) => x.id === id) !== -1;

		if (alreadyAdded) {
			return;
		}

		const trickToAdd = this.getFromStorage<LibraryTrick[]>(localStorageKeys.tricks)?.find((x) => x.id === id);

		if (trickToAdd === undefined) {
			throw new Error("Trick does not exist");
		}

		myTricks.push(trickToAdd);

		this.addToStorage(localStorageKeys.myTricks, myTricks);
	};

	public removeFromMyTricks = (id: number) => {
		const myTricks = this.getFromStorage<MyTrick[]>(localStorageKeys.myTricks) ?? [];
		const trickToRemoveIndex = myTricks.findIndex((x) => x.id === id);

		if (trickToRemoveIndex === -1) {
			return;
		}

		myTricks.splice(trickToRemoveIndex, 1);
		this.addToStorage(localStorageKeys.myTricks, myTricks);
	};

	public initiateTricksLibrary = (tricks: LibraryTrick[]) => {
		const shouldInitiate = this.getFromStorage<LibraryTrick[]>(localStorageKeys.tricks) === null;

		if (shouldInitiate) {
			this.addToStorage(localStorageKeys.tricks, tricks);
		}
	};

	private getFromStorage<T>(key: string): T | null {
		const json = localStorage.getItem(key);

		if (json === null) {
			return null;
		}

		return JSON.parse(json);
	}

	private addToStorage(key: string, value: any) {
		localStorage.setItem(key, JSON.stringify(value));
	}
}

const localStorageDataService = new LocalStorageDataService();

export default localStorageDataService;
