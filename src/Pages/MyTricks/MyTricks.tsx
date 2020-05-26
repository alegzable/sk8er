import React, { useState, useEffect } from "react";
import classes from "./MyTricks.module.scss";
import { MyTrick } from "../Tricks/Trick/TrickTypes";
import localStorageDataService from "../../Services/LocalStorageDataService";
import MyTricksList from "./MyTricksList/MyTricksList";
import MyTrickDetails from "./MyTrickDetails/MyTrickDetails";
import { Link, useHistory, RouteComponentProps } from "react-router-dom";

type MyTrickProps = { id?: string };

const MyTricks: React.FC<RouteComponentProps<MyTrickProps>> = ({ match }) => {
	const [myTricks, setMyTricks] = useState<MyTrick[]>([]);
	const [selectedTrick, setSelectedTrick] = useState<MyTrick | undefined>();
	const history = useHistory();

	useEffect(() => {
		const getMyTricks = async () => {
			const myTricks = await localStorageDataService.getMyTricksAsync();

			setMyTricks(myTricks);
		};

		getMyTricks();
	}, [history.location.pathname]);

	useEffect(() => {
		if (myTricks.length === 0) {
			return;
		}

		const redirectToFirstTrick = (myTricks: MyTrick[]) => {
			const firstTrickId = myTricks[0]?.id;

			if (firstTrickId !== undefined) {
				history.push(`/my-tricks/${firstTrickId}`);
			}
		};

		const id = match.params.id !== undefined ? +match.params.id : undefined;

		if (id === undefined) {
			redirectToFirstTrick(myTricks);
		} else {
			const selectedTrick = myTricks.find((x) => x.id === id);
			if (selectedTrick === undefined) {
				history.push("/404");
			} else {
				setSelectedTrick(selectedTrick);
			}
		}
	}, [myTricks, match.params.id, history]);

	const content =
		myTricks.length > 0 && selectedTrick ? (
			<>
				<div className={`${classes.List} ${classes.DesktopOnly}`}>
					<MyTricksList tricks={myTricks} />
				</div>
				<div className={classes.Details}>
					<MyTrickDetails initialTrick={selectedTrick}></MyTrickDetails>
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
