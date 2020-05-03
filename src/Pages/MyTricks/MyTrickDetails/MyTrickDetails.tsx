import React, { useState, useEffect } from "react";
import classes from "./MyTrickDetails.module.scss";
import { MyTrick } from "../../Tricks/Trick/TrickTypes";
import Video from "../../Tricks/Trick/Video/Video";
import Calendar from "./Calendar/Calendar";
import CalendarDate from "./Calendar/CalendarDate";
import { RouteComponentProps, Route, NavLink, useHistory } from "react-router-dom";
import ScoreDialog from "./Score/ScoreDialog/ScoreDialog";
import localStorageDataService from "../../../Services/LocalStorageDataService";
import ScoreChart from "./Score/ScoreChart/ScoreChart";
import PracticeDate from "./Score/DailyScore";

type MyTrickDetailsProps = {
	id: string;
};

const MyTrickDetails: React.FC<RouteComponentProps<MyTrickDetailsProps>> = ({ match }) => {
	const id = +match.params.id;
	const [trick, setTrick] = useState<MyTrick | undefined>(undefined);
	const history = useHistory();

	useEffect(() => {
		setTrick(localStorageDataService.getMyTrick(id));
	}, [id, history.location.pathname]);

	const onCellClick = (date: CalendarDate, marked: boolean) => {
		if (marked) {
			localStorageDataService.removePracticeDay(id, date);
		} else {
			localStorageDataService.addPracticeDay(id, date);
		}

		setTrick(localStorageDataService.getMyTrick(id));
	};

	const redirectToTrickDetails = () => history.push(`/my-tricks/${id}`);
	const onScoreSave = (date: CalendarDate, score: number) => {
		localStorageDataService.updateTrickScore(id, new PracticeDate(date, score));

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

	const addScorePath = `/my-tricks/${id}/add-score`;
	const details = trick ? (
		<>
			<h1 className={classes.TrickName}>{trick.name}</h1>
			<div className={classes.Score}>
				<h3 className={classes.CurrentLevel}>Your lvl: {calculateTrickLevel(trick)}</h3>

				<NavLink className={classes.AddScore} to={addScorePath}>
					<span>Add Score</span>
				</NavLink>
			</div>

			<Route path="/my-tricks/:id/add-score">
				<ScoreDialog
					isOpen={history.location.pathname === addScorePath}
					trick={trick}
					onClose={redirectToTrickDetails}
					onSave={onScoreSave}
				/>
			</Route>

			<div className={classes.ScoreChart}>
				<ScoreChart trick={trick} />
			</div>
			<div className={classes.Column}>
				<Video url={trick.videoUrl} title={trick.name} />
			</div>
			<div className={classes.Row}>
				<div className={classes.Calendar}>
					<Calendar
						markedDates={trick.practiceDates.map((x) => x.date)}
						onCellClick={onCellClick}
						title={"Have you practiced today?"}
					/>
				</div>
			</div>
		</>
	) : null;

	return <div className={classes.MyTrickDetails}>{details}</div>;
};

export default MyTrickDetails;
