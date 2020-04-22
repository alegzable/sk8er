import React, { useState, useEffect } from "react";
import classes from "./MyTricks.module.scss";
import { MyTrick } from "../Tricks/Trick/TrickTypes";
import localStorageDataService from "../../Services/LocalStorageDataService";
import MyTricksList from "./MyTricksList/MyTricksList";
import MyTrickDetails from "./MyTrickDetails/MyTrickDetails";
import { Link, Route, useHistory } from "react-router-dom";

const MyTricks: React.FC = () => {
	const [myTricks, setMyTricks] = useState<MyTrick[]>([]);
	const history = useHistory();

	useEffect(() => {
		setMyTricks(localStorageDataService.getMyTricks());
	}, []);

	useEffect(() => {
		const redirectToFirstTrick = (pathname: string, myTricks: MyTrick[]) => {
			const paramId = pathname.split("/")[2];
			const firstTrickId = myTricks[0]?.id;

			if (paramId === undefined && firstTrickId !== undefined) {
				history.push(`/my-tricks/${firstTrickId}`);
			}
		};

		redirectToFirstTrick(history.location.pathname, myTricks);
	}, [history, history.location.pathname, myTricks]);

	const content =
		myTricks.length > 0 ? (
			<>
				<div className={classes.List}>
					<MyTricksList tricks={myTricks} />
				</div>
				<div className={classes.Details}>
					<Route path="/my-tricks/:id" component={MyTrickDetails}></Route>
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
