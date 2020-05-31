import React, { useState, useEffect } from "react";
import classes from "./MyTricks.module.scss";
import MyTricksList from "./MyTricksList/MyTricksList";
import MyTrickDetails from "./MyTrickDetails/MyTrickDetails";
import { Link, useHistory, RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadMyTricksAsync } from "./myTricksActions";
import myTricksSelector, { MyTrick } from "./myTricksSelector";
import { loadTricksAsync } from "../Tricks/tricksActions";

type MyTrickProps = { id?: string };

const MyTricks: React.FC<RouteComponentProps<MyTrickProps>> = ({ match }) => {
	const dispatch = useDispatch();
	const { data: myTricks } = useSelector(myTricksSelector);
	const [selectedUserTrick, setSelectedTrick] = useState<MyTrick | undefined>();
	const history = useHistory();

	useEffect(() => {
		dispatch(loadTricksAsync());
		dispatch(loadMyTricksAsync());
	}, [dispatch]);

	useEffect(() => {
		if (myTricks.length === 0) {
			return;
		}

		const redirectToFirstTrick = (myTricks: MyTrick[]) => {
			const firstTrickId = myTricks[0]?.userTrickId;

			if (firstTrickId !== undefined) {
				history.push(`/my-tricks/${firstTrickId}`);
			}
		};

		const id = match.params.id;

		if (id === undefined) {
			redirectToFirstTrick(myTricks);
		} else {
			const selectedTrick = myTricks.find((x) => x.userTrickId === id);
			if (selectedTrick === undefined) {
				history.push("/404");
			} else {
				setSelectedTrick(selectedTrick);
			}
		}
	}, [myTricks, match.params.id, history]);

	const content =
		myTricks.length > 0 && selectedUserTrick ? (
			<>
				<div className={`${classes.List} ${classes.DesktopOnly}`}>
					<MyTricksList tricks={myTricks} />
				</div>
				<div className={classes.Details}>
					<MyTrickDetails myTrick={selectedUserTrick}></MyTrickDetails>
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
