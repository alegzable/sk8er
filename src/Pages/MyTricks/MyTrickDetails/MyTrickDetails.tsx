import React, { useState, useEffect } from "react";
import classes from "./MyTrickDetails.module.scss";
import { MyTrick } from "../../Tricks/Trick/TrickTypes";
import Video from "../../Tricks/Trick/Video/Video";
import Calendar from "./Calendar/Calendar";
import CalendarDate from "./Calendar/CalendarDate";
import { RouteComponentProps, Route, NavLink, useHistory } from "react-router-dom";
import ScoreDialog from "./Score/ScoreDialog/ScoreDialog";
import localStorageDataService from "../../../Services/LocalStorageDataService";

type MyTrickDetailsProps = {
	id: string;
};

const MyTrickDetails: React.FC<RouteComponentProps<MyTrickDetailsProps>> = ({ match }) => {
	const id = +match.params.id;
	const [trick, setTrick] = useState<MyTrick | undefined>(undefined);
	const history = useHistory();

	useEffect(() => {
		setTrick(localStorageDataService.getMyTrick(id));
	}, [id]);

	const onCellClick = (date: CalendarDate, marked: boolean) => {
		if (marked) {
			localStorageDataService.removePracticeDay(id, date);
		} else {
			localStorageDataService.addPracticeDay(id, date);
		}

		setTrick(localStorageDataService.getMyTrick(id));
	};

	const onDialogClose = () => {
		history.push(`/my-tricks/${id}`);
	};

	console.log(history.location.pathname);
	const addScorePath = `/my-tricks/${id}/add-score`;
	const details = trick ? (
		<>
			<h1 className={classes.TrickName}>{trick.name}</h1>
			<div className={classes.Score}>
				<h3 className={classes.CurrentLevel}>Your lvl: 0</h3>

				<NavLink className={classes.AddScore} to={addScorePath}>
					<span>Add Score</span>
				</NavLink>
			</div>

			<Route path="/my-tricks/:id/add-score">
				<ScoreDialog
					isOpen={history.location.pathname === addScorePath}
					trickId={trick.id}
					trickName={trick.name}
					onClose={onDialogClose}
				/>
			</Route>
			<div className={classes.Column}>
				<Video url={trick.videoUrl} title={trick.name} />
			</div>
			<div className={classes.Row}>
				<div className={classes.Calendar}>
					<Calendar
						markedDates={trick.practiceDates}
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
