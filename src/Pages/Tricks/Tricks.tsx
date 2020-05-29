import React, { useEffect } from "react";
import classes from "./Tricks.module.scss";
import Trick from "./Trick/Trick";
import { useDispatch, useSelector } from "react-redux";
import { getTricksAsync } from "./tricksActions";
import { addMyTrickAsync, removeTrickAsync, getMyTricksAsync } from "../MyTricks/myTricksActions";
import tricksSelector, { UserLibraryTrick } from "./userLibraryTricksSelector";

const Tricks: React.FC = () => {
	const dispatch = useDispatch();
	const tricks: UserLibraryTrick[] = useSelector(tricksSelector);

	useEffect(() => {
		dispatch(getTricksAsync());
		dispatch(getMyTricksAsync());
	}, [dispatch]);

	const addToMyTricks = async (id: number) => {
		dispatch(addMyTrickAsync(id));
	};

	const removeFromMyTricks = async (id: number) => {
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
