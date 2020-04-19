import React, { useState, useEffect } from "react";
import classes from "./MyTrickDetails.module.scss";
import { MyTrick } from "../../Tricks/Trick/TrickTypes";
import Video from "../../Tricks/Trick/Video/Video";
import Calendar from "./Calendar/Calendar";
import localStorageDataService from "../../../Services/LocalStorageDataService";
import CalendarDate from "./Calendar/CalendarDate";

type MyTrickDetailsProps = {
	id?: number;
};

const MyTrickDetails: React.FC<MyTrickDetailsProps> = ({ id }) => {
	const [trick, setTrick] = useState<MyTrick | undefined>(undefined);

	useEffect(() => {
		setTrick(localStorageDataService.getMyTrick(id));
	}, [id]);

	const onCellClick = (date: CalendarDate, marked: boolean) => {
		if (marked) {
			localStorageDataService.removePracticeDay(id as number, date);
		} else {
			localStorageDataService.addPracticeDay(id as number, date);
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
				<Calendar markedDates={trick.practiceDates} onCellClick={onCellClick} />
			</div>
		</>
	) : null;

	return <div className={classes.MyTrickDetails}>{details}</div>;
};

export default MyTrickDetails;
