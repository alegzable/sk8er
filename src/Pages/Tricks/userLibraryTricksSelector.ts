import { RootState } from "../../rootReducer";
import { LibraryTrick } from "./Trick/TrickTypes";

export type UserLibraryTrick = LibraryTrick & { addedToMyTricks: boolean };

const userLibraryTricksSelector = ({ tricks, myTricks }: RootState): UserLibraryTrick[] => {
	if (tricks === null) {
		return [];
	}

	const myTrickIds = myTricks?.map((x) => x.id);

	const userLibraryTricks = tricks.map((libraryTrick) => {
		const addedToMyTricks = myTrickIds?.includes(libraryTrick.id) ?? false;

		return {
			...libraryTrick,
			addedToMyTricks,
		};
	});

	return userLibraryTricks;
};

export default userLibraryTricksSelector;
