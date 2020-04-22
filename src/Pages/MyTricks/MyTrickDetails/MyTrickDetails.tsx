import React, { useState, useEffect } from "react";
import classes from "./MyTrickDetails.module.scss";
import { MyTrick } from "../../Tricks/Trick/TrickTypes";
import Video from "../../Tricks/Trick/Video/Video";
import Calendar from "./Calendar/Calendar";
import localStorageDataService from "../../../Services/LocalStorageDataService";
import CalendarDate from "./Calendar/CalendarDate";
import { RouteComponentProps } from "react-router-dom";

type MyTrickDetailsProps = {
	id: string;
};

const MyTrickDetails: React.FC<RouteComponentProps<MyTrickDetailsProps>> = ({ match }) => {
	const id = +match.params.id;
	const [trick, setTrick] = useState<MyTrick | undefined>(undefined);

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

	const details = trick ? (
		<>
			<h2>{trick.name}</h2>
			<div className={classes.Video}>
				<Video url={trick.videoUrl} title={trick.name} />
			</div>
			<div className={classes.Calendar}>
				<Calendar
					markedDates={trick.practiceDates}
					onCellClick={onCellClick}
					title={"Have you practiced today?"}
				/>
			</div>
		</>
	) : null;

	return <div className={classes.MyTrickDetails}>{details}</div>;
};

export default MyTrickDetails;
