import React, { useState, useEffect } from "react";
import classes from "./MyTricks.module.scss";
import { MyTrick } from "../Tricks/Trick/TrickTypes";
import localStorageDataService from "../../Services/LocalStorageDataService";
import MyTricksList from "./MyTricksList/MyTricksList";
import MyTrickDetails from "./MyTrickDetails/MyTrickDetails";
import { Link } from "react-router-dom";

const MyTricks: React.FC = () => {
	const [myTricks, setMyTricks] = useState<MyTrick[]>([]);
	const [selectedTrick, setSelectedTrick] = useState<MyTrick>();

	useEffect(() => {
		setMyTricks(localStorageDataService.getMyTricks());
	}, []);

	useEffect(() => {
		setSelectedTrick(myTricks[0]);
	}, [myTricks]);

	const selectedTrickChanged = (id: number) => {
		const trick = myTricks.find((x) => x.id === id);
		setSelectedTrick(trick);
	};

	const content =
		myTricks.length > 0 ? (
			<>
				<div className={classes.List}>
					<MyTricksList
						tricks={myTricks}
						selectedTrick={selectedTrick}
						selectedTrickChanged={selectedTrickChanged}
					/>
				</div>
				<div className={classes.Details}>
					<MyTrickDetails id={selectedTrick?.id} />
				</div>
			</>
		) : (
			<h2 className={classes.AddTricks}>
				<span>Whoops! It's empty here :(</span>
				<Link to="/">Let's start learning!</Link>
			</h2>
		);

	return <div className={classes.MyTricks}>{content}</div>;
};

export default MyTricks;
