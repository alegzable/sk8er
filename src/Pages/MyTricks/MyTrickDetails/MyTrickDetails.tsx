import React, { useState, useEffect } from "react";
import classes from "./MyTrickDetails.module.scss";
import { MyTrick } from "../../Tricks/Trick/TrickTypes";
import Video from "../../Tricks/Trick/Video/Video";
import Calendar from "./Calendar/Calendar";
import CalendarDate from "./Calendar/CalendarDate";
import { Route, NavLink, useHistory } from "react-router-dom";
import ScoreDialog from "./Score/ScoreDialog/ScoreDialog";
import localStorageDataService from "../../../Services/LocalStorageDataService";
import ScoreChart from "./Score/ScoreChart/ScoreChart";
import PracticeDate from "./Score/DailyScore";

type MyTrickDetailsProps = {
	initialTrick: MyTrick;
};

const MyTrickDetails: React.FC<MyTrickDetailsProps> = ({ initialTrick }) => {
	const history = useHistory();
	const [myTrick, setMyTrick] = useState(initialTrick);
	const redirectToTrickDetails = () => history.push(`/my-tricks/${myTrick.id}`);

	useEffect(() => {
		setMyTrick(initialTrick);
	}, [initialTrick]);

	const onCellClick = async (date: CalendarDate, marked: boolean) => {
		if (marked) {
			localStorageDataService.removePracticeDayAsync(myTrick.id, date);
		} else {
			localStorageDataService.addPracticeDayAsync(myTrick.id, date);
		}

		setMyTrick(await localStorageDataService.getMyTrickAsync(myTrick.id));
	};

	const onScoreSave = (date: CalendarDate, score: number) => {
		localStorageDataService.updateTrickScoreAsync(myTrick.id, new PracticeDate(date, score));

		redirectToTrickDetails();
	};

	const calculateTrickLevel = (trick: MyTrick): number => {
		const scoredPracticeDates = trick.practiceDates.filter((x) => x.score !== undefined);
		const scoresToCalculateLvl = 10;
		const lvl =
			scoredPracticeDates
				.slice(Math.max(scoredPracticeDates.length - scoresToCalculateLvl, 0))
				.reduce((a, b) => a + (b.score as number), 0) / scoresToCalculateLvl;

		return Math.round(lvl);
	};

	const addScorePath = `/my-tricks/${myTrick.id}/add-score`;
	const details = myTrick ? (
		<>
			<h1 className={classes.TrickName}>{myTrick.name}</h1>
			<div className={classes.Score}>
				<h3 className={classes.CurrentLevel}>Your lvl: {calculateTrickLevel(myTrick)}</h3>
				<NavLink className={classes.AddScore} to={addScorePath}>
					<span>Add Score</span>
				</NavLink>
				<Route path="/my-tricks/:id/add-score">
					<ScoreDialog
						isOpen={history.location.pathname === addScorePath}
						trick={myTrick}
						onClose={redirectToTrickDetails}
						onSave={onScoreSave}
					/>
				</Route>
			</div>
			<div className={classes.Row}>
				<div className={`${classes.Column} ${classes.ScoreChart}`}>
					<ScoreChart trick={myTrick} />
				</div>
				<div className={classes.Column}>
					<div className={classes.Calendar}>
						<Calendar
							markedDates={myTrick.practiceDates.map((x) => x.date)}
							onCellClick={onCellClick}
							title={"Have you practiced today?"}
						/>
					</div>
				</div>
			</div>
			<div className={classes.Row}>
				<div className={`${classes.Column} ${classes.Video}`}>
					<Video url={myTrick.videoUrl} title={myTrick.name} />
				</div>
			</div>
		</>
	) : null;

	return <div className={classes.MyTrickDetails}>{details}</div>;
};

export default MyTrickDetails;
