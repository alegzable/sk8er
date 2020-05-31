import { RootState, State } from "../../rootReducer";
import { LibraryTrick } from "./Trick/TrickTypes";
import { Selector } from "react-redux";

export type UserLibraryTrick = LibraryTrick & { addedToMyTricks: boolean };

const userLibraryTricksSelector: Selector<RootState, State<UserLibraryTrick[]>> = ({
	tricks: tricksState,
	userTricks: userTricksState,
}) => {
	const libraryTricks = tricksState.data;
	const userTricks = userTricksState.data;
	const libraryTickIdsInMyTricks = userTricks.map((x) => x.libraryTrickId);

	const userLibraryTricks = libraryTricks.map((libraryTrick) => {
		const addedToMyTricks = libraryTickIdsInMyTricks?.includes(libraryTrick.id) ?? false;

		return {
			...libraryTrick,
			addedToMyTricks,
		};
	});

	return {
		loading: tricksState.loading || userTricksState.loading,
		data: userLibraryTricks,
		error: undefined,
	};
};

export default userLibraryTricksSelector;
