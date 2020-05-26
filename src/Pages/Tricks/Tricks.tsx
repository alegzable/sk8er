import React, { useState, useEffect } from "react";
import classes from "./Tricks.module.scss";
import Trick from "./Trick/Trick";
import localStorageDataService from "../../Services/LocalStorageDataService";
import { UserLibraryTrick } from "./Trick/TrickTypes";

const Tricks: React.FC = () => {
	const [tricks, setTricks] = useState<UserLibraryTrick[]>([]);

	useEffect(() => {
		const getUserLibraryTricks = async () => {
			const libraryTricks = await localStorageDataService.getUserLibraryTricksAsync();

			setTricks(libraryTricks);
		};

		getUserLibraryTricks();
	}, []);

	const addToMyTricks = async (id: number) => {
		await localStorageDataService.addToMyTricksAsync(id);

		setTricks(await localStorageDataService.getUserLibraryTricksAsync());
	};

	const removeFromMyTricks = async (id: number) => {
		await localStorageDataService.removeFromMyTricksAsync(id);

		setTricks(await localStorageDataService.getUserLibraryTricksAsync());
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
