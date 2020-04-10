import React, { useState, useEffect } from "react";
import classes from "./Tricks.module.scss";
import Trick from "./Trick/Trick";
import localStorageDataService from "../../Services/LocalStorageDataService";
import { UserLibraryTrick } from "./Trick/TrickTypes";

const Tricks: React.FC = () => {
	const [tricks, setTricks] = useState<UserLibraryTrick[]>([]);

	useEffect(() => {
		setTricks(localStorageDataService.getUserLibraryTricks());
	}, []);

	const addToMyTricks = (id: number) => {
		localStorageDataService.addToMyTricks(id);

		setTricks(localStorageDataService.getUserLibraryTricks());
	};

	const removeFromMyTricks = (id: number) => {
		localStorageDataService.removeFromMyTricks(id);

		setTricks(localStorageDataService.getUserLibraryTricks());
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
