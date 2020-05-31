import React, { useEffect } from "react";
import classes from "./Tricks.module.scss";
import Trick from "./Trick/Trick";
import { useDispatch, useSelector } from "react-redux";
import { loadTricksAsync } from "./tricksActions";
import { addMyTrickAsync, removeTrickAsync, loadMyTricksAsync } from "../MyTricks/myTricksActions";
import tricksSelector from "./userLibraryTricksSelector";
import { usePreLoader } from "../../UI/PreLoader/PreLoader";

const Tricks: React.FC = () => {
	const dispatch = useDispatch();
	const { data: tricks, loading } = useSelector(tricksSelector);
	usePreLoader(loading);

	useEffect(() => {
		dispatch(loadTricksAsync());
		dispatch(loadMyTricksAsync());
	}, [dispatch]);

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
