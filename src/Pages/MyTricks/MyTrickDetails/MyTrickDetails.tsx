import React, { useEffect } from "react";
import classes from "./MyTrickDetails.module.scss";
import { UserTrickPracticeDay } from "../../Tricks/Trick/TrickTypes";
import Video from "../../Tricks/Trick/Video/Video";
import Calendar from "./Calendar/Calendar";
import CalendarDate from "./Calendar/CalendarDate";
import { Route, NavLink, useHistory } from "react-router-dom";
import ScoreDialog from "./Score/ScoreDialog/ScoreDialog";
import ScoreChart from "./Score/ScoreChart/ScoreChart";
import { useDispatch, useSelector } from "react-redux";
import { MyTrick } from "../myTricksSelector";
import {
	loadUserPracticeDaysAsync,
	removeUserPracticeDayAsync,
	addUserPracticeDayAsync,
	updateUserPracticeDayAsync,
} from "./practiceDaysActions";
import { RootState, State } from "../../../rootReducer";

type MyTrickDetailsProps = {
	myTrick: MyTrick;
};

const MyTrickDetails: React.FC<MyTrickDetailsProps> = ({ myTrick }) => {
	const { userTrickId, name: trickName, videoUrl } = myTrick;
	const history = useHistory();
	const dispatch = useDispatch();
	const { data: practiceDays } = useSelector<RootState, State<UserTrickPracticeDay[]>>((state) => state.practiceDays);
	const redirectToTrickDetails = () => history.push(`/my-tricks/${userTrickId}`);

	useEffect(() => {
		dispatch(loadUserPracticeDaysAsync(userTrickId));
	}, [dispatch, userTrickId]);

	const onCellClick = async (date: CalendarDate, marked: boolean) => {
		if (marked) {
			const practiceDayId = practiceDays.find((x) => x.date.equals(date))?.id;

			if (practiceDayId === undefined) {
				return;
			}

			dispatch(removeUserPracticeDayAsync(practiceDayId));
		} else {
			dispatch(addUserPracticeDayAsync(userTrickId, date));
		}
	};

	const onScoreSave = (date: CalendarDate, score: number) => {
		dispatch(updateUserPracticeDayAsync(userTrickId, date, score));

		redirectToTrickDetails();
	};

	const calculateTrickLevel = (): number => {
		const scoredPracticeDates = practiceDays.filter((x) => x.score !== undefined);
		const scoresToCalculateLvl = 10;
		const lvl =
			scoredPracticeDates
				.slice(Math.max(scoredPracticeDates.length - scoresToCalculateLvl, 0))
				.reduce((a, b) => a + (b.score as number), 0) / scoresToCalculateLvl;

		return Math.round(lvl);
	};

	const scoredPracticeDays = practiceDays
		.filter((x) => x.score !== undefined)
		.sort((a, b) => a.date.compare(b.date))
		.map((x) => {
			return { date: x.date.getDate().toString(), score: x.score as number };
		});

	const addScorePath = `/my-tricks/${userTrickId}/add-score`;
	const details = myTrick ? (
		<>
			<h1 className={classes.TrickName}>{trickName}</h1>
			<div className={classes.Score}>
				<h3 className={classes.CurrentLevel}>Your lvl: {calculateTrickLevel()}</h3>
				<NavLink className={classes.AddScore} to={addScorePath}>
					<span>Add Score</span>
				</NavLink>
				<Route path="/my-tricks/:id/add-score">
					<ScoreDialog
						isOpen={history.location.pathname === addScorePath}
						trickName={trickName}
						practiceDays={practiceDays}
						onClose={redirectToTrickDetails}
						onSave={onScoreSave}
					/>
				</Route>
			</div>
			<div className={classes.Row}>
				<div className={`${classes.Column} ${classes.ScoreChart}`}>
					<ScoreChart scores={scoredPracticeDays} />
				</div>
				<div className={classes.Column}>
					<div className={classes.Calendar}>
						<Calendar
							markedDates={practiceDays.map((x) => x.date)}
							onCellClick={onCellClick}
							title={"Have you practiced today?"}
						/>
					</div>
				</div>
			</div>
			<div className={classes.Row}>
				<div className={`${classes.Column} ${classes.Video}`}>
					<Video url={videoUrl} title={trickName} />
				</div>
			</div>
		</>
	) : null;

	return <div className={classes.MyTrickDetails}>{details}</div>;
};

export default MyTrickDetails;
