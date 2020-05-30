import { RootState, State } from "../../rootReducer";
import { LibraryTrick } from "./Trick/TrickTypes";

export type UserLibraryTrick = LibraryTrick & { addedToMyTricks: boolean };

const userLibraryTricksSelector = ({ tricks, myTricks }: RootState): State<UserLibraryTrick[]> => {
	const libraryTricks = tricks.data;

	const myTrickIds = myTricks?.map((x) => x.id);

	const userLibraryTricks = libraryTricks.map((libraryTrick) => {
		const addedToMyTricks = myTrickIds?.includes(libraryTrick.id) ?? false;

		return {
			...libraryTrick,
			addedToMyTricks,
		};
	});

	return {
		loading: tricks.loading,
		data: userLibraryTricks,
		error: undefined,
	};
};

export default userLibraryTricksSelector;
