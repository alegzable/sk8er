import { RootState, State } from "../../rootReducer";
import { Selector } from "react-redux";

export type MyTrick = {
	userTrickId: string;
	name: string;
	videoUrl: string;
};

const myTricksSelector: Selector<RootState, State<MyTrick[]>> = ({
	tricks: tricksState,
	userTricks: userTricksState,
}) => {
	const libraryTricks = tricksState.data;
	const userTricks = userTricksState.data;
	return {
		loading: tricksState.loading,
		data: userTricks
			.map((userTrick) => {
				const libraryTrick = libraryTricks.find((trick) => trick.id === userTrick.libraryTrickId);

				if (!libraryTrick) {
					return undefined;
				}

				return {
					userTrickId: userTrick.id,
					name: libraryTrick.name,
					videoUrl: libraryTrick.videoUrl,
				};
			})
			.filter((trick) => trick !== undefined) as MyTrick[],
	};
};

export default myTricksSelector;
