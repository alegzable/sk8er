import React, { useState, useEffect } from "react";
import classes from "./Calendar.module.scss";
import CalendarColumn from "./CalendarColumn/CalendarColumn";
import { CalendarCellModel } from "./CalendarCell/CalendarCellModel";
import { weekDaysAbbr } from "../../../../Utils/dateUtils";
import CalendarDate from "./CalendarDate";
import { getRemString } from "../../../../Utils/htmlUtils";

type CalendarProps = {
	markedDates: CalendarDate[];
	onCellClick: (date: CalendarDate, marked: boolean) => void;
};

const getNumberOfColumns = () => {
	const windowWidth = window.innerWidth;
	if (windowWidth < 600) {
		return 6;
	} else if (windowWidth >= 600 && windowWidth < 800) {
		return 12;
	}

	return 20;
};

const getColumnsWithDates = (
	numberOfColumns: number,
	lastDate: CalendarDate,
	markedDates: CalendarDate[]
): CalendarCellModel[][] => {
	const defaultCellsInColumn = 7;
	const cellsInLastColumn = lastDate.getDayOfWeek() + 1;
	let totalCells = (numberOfColumns - 1) * defaultCellsInColumn + cellsInLastColumn;
	let firstDate = lastDate.addDays((totalCells - 1) * -1);
	const columns: CalendarCellModel[][] = [];

	for (let i = 0; i < numberOfColumns; i++) {
		const column = [];

		for (let i = 0; i < defaultCellsInColumn && totalCells > 0; i++) {
			column.push({
				date: firstDate,
				marked: markedDates.findIndex((x) => x.equals(firstDate)) !== -1,
			});
			firstDate = firstDate.addDays(1);
			totalCells--;
		}

		columns.push(column);
	}

	return columns;
};

const getWeekDays = (cellSize: number) => {
	const weekDays = weekDaysAbbr.map((x, i) => (
		<div
			key={i}
			style={{
				height: getRemString(cellSize),
				width: getRemString(cellSize),
				lineHeight: getRemString(cellSize),
			}}
		>
			{x}
		</div>
	));
	return (
		<div className={classes.WeekDays} style={{ marginTop: getRemString(cellSize) }}>
			{weekDays}
		</div>
	);
};

const Calendar: React.FC<CalendarProps> = ({ markedDates, onCellClick }) => {
	const [numberOfColumns, setNumberOfColumns] = useState(getNumberOfColumns());
	const [columnsWithDates, setColumnsWithDates] = useState<CalendarCellModel[][]>([]);
	const [cellSize, setCellSize] = useState(4);

	useEffect(() => {
		const columns = getColumnsWithDates(numberOfColumns, CalendarDate.today(), markedDates);
		setColumnsWithDates(columns);
	}, [numberOfColumns, markedDates]);

	const columns = columnsWithDates.map((column, index) => {
		return (
			<CalendarColumn dates={column} cellSize={cellSize} onCellClick={onCellClick} index={index} key={index} />
		);
	});

	const weekDays = getWeekDays(cellSize);

	return (
		<div className={classes.Calendar} style={{ fontSize: getRemString(cellSize * 0.3) }}>
			{columns}
			{weekDays}
		</div>
	);
};

export default Calendar;
