import React, { useState, useEffect } from "react";
import classes from "./MyTricks.module.scss";
import MyTricksList from "./MyTricksList/MyTricksList";
import MyTrickDetails from "./MyTrickDetails/MyTrickDetails";
import { Link, useHistory, RouteComponentProps } from "react-router-dom";
import { useSelector } from "react-redux";
import myTricksSelector, { MyTrick } from "./myTricksSelector";
import { usePreLoader } from "../../UI/PreLoader/PreLoader";
import useInitDispatcher from "../../Hooks/useInitDispatcher";

type MyTrickProps = { id?: string };

const MyTricks: React.FC<RouteComponentProps<MyTrickProps>> = ({ match }) => {
	useInitDispatcher();

	const { data: myTricks, loading = true } = useSelector(myTricksSelector);
	const [selectedUserTrick, setSelectedTrick] = useState<MyTrick | undefined>();
	const history = useHistory();
	usePreLoader(loading);

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
		) : !loading ? (
			<h2 className={classes.AddTricks}>
				<span>Whoops! It's empty here :(</span>
				<Link to="/">Let's start learning!</Link>
			</h2>
		) : null;

	return <div className={classes.MyTricks}>{content}</div>;
};

export default MyTricks;
