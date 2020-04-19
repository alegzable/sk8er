import React from "react";
import classes from "./CalendarCell.module.scss";
import CalendarDate from "../CalendarDate";
import { getRemString } from "../../../../../Utils/htmlUtils";

type CalendarCellProps = {
	size: number;
	date: CalendarDate;
	marked: boolean;
	onClick: (date: CalendarDate, marked: boolean) => void;
};

const CalendarCell: React.FC<CalendarCellProps> = ({ size, date, marked, onClick }) => {
	const classNames = [classes.CalendarCell];

	if (marked) {
		classNames.push(classes.Marked);
	}

	if (date.equals(CalendarDate.today())) {
		classNames.push(classes.Today);
	}

	const dayOfWeek = date.getDayOfWeek();
	if (dayOfWeek === 6 || dayOfWeek === 0) {
		classNames.push(classes.Weekend);
	}

	const style = {
		width: getRemString(size),
		height: getRemString(size),
		lineHeight: getRemString(size),
	};

	return (
		<div className={classNames.join(" ")} style={style} onClick={() => onClick(date, marked)}>
			{date.day}
		</div>
	);
};

export default CalendarCell;
