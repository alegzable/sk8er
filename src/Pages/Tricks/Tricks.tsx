import React from "react";
import classes from "./Tricks.module.scss";
import Trick from "./Trick/Trick";
import { useSelector } from "react-redux";
import { addMyTrickAsync, removeTrickAsync } from "../MyTricks/myTricksActions";
import tricksSelector from "./userLibraryTricksSelector";
import { usePreLoader } from "../../UI/PreLoader/PreLoader";
import useInitDispatcher from "../../Hooks/useInitDispatcher";

const Tricks: React.FC = () => {
	const dispatch = useInitDispatcher();
	const { data: tricks, loading = true } = useSelector(tricksSelector);
	usePreLoader(loading);

	const addToMyTricks = async (id: string) => {
		dispatch(addMyTrickAsync(id));
	};

	const removeFromMyTricks = async (id: string) => {
		dispatch(removeTrickAsync(id));
	};

	const trickList = tricks.map((trick) => (
		<Trick
			key={trick.id}
			id={trick.id}
			name={trick.name}
			videoUrl={trick.videoUrl}
			added={trick.addedToMyTricks}
			addToMyTricks={addToMyTricks}
			removeFromMyTricks={removeFromMyTricks}
		/>
	));

	return <div className={classes.Tricks}>{trickList}</div>;
};

export default Tricks;
