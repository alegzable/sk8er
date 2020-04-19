import React from "react";
import classes from "./CalendarColumn.module.scss";
import CalendarCell from "../CalendarCell/CalendarCell";
import { CalendarCellModel } from "../CalendarCell/CalendarCellModel";
import CalendarDate from "../CalendarDate";
import { monthsAbbr, getYearAbbr } from "../../../../../Utils/dateUtils";
import { getRemString } from "../../../../../Utils/htmlUtils";

type CalendarColumnProps = {
	dates: CalendarCellModel[];
	cellSize: number;
	index: number;
	onCellClick: (date: CalendarDate, marked: boolean) => void;
};

const CalendarColumn: React.FC<CalendarColumnProps> = ({ dates, cellSize, index, onCellClick }) => {
	const cells = dates.map((x) => (
		<CalendarCell
			size={cellSize}
			date={x.date}
			marked={x.marked}
			onClick={onCellClick}
			key={x.date.getTimeSinceUnixEpoch()}
		/>
	));

	const getColumnHeader = () => {
		if (dates.length === 0) {
			return "";
		}

		const firstDayOfMonthDate = dates.find((x) => x.date.day === 1);
		const year =
			firstDayOfMonthDate && firstDayOfMonthDate.date.month === 0
				? getYearAbbr(firstDayOfMonthDate.date.year)
				: index === 0
				? getYearAbbr(dates[0].date.year)
				: "";
		const month =
			firstDayOfMonthDate !== undefined
				? monthsAbbr[firstDayOfMonthDate.date.month]
				: index === 0
				? monthsAbbr[dates[0].date.month]
				: "";

		const style = {
			width: getRemString(cellSize),
			height: getRemString(cellSize),
			lineHeight: getRemString(cellSize),
			fontSize: getRemString(cellSize * 0.25),
		};

		return (
			<div className={classes.ColumnHeader} style={style}>
				{month + year}
			</div>
		);
	};

	const columnHeader = getColumnHeader();

	return (
		<div className={classes.CalendarColumn}>
			{columnHeader}
			{cells}
		</div>
	);
};

export default CalendarColumn;
