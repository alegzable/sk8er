import React, { useState, useEffect, useRef } from "react";
import classes from "./Calendar.module.scss";
import CalendarColumn from "./CalendarColumn/CalendarColumn";
import { CalendarCellModel } from "./CalendarCell/CalendarCellModel";
import { weekDaysAbbr } from "../../../../Utils/dateUtils";
import CalendarDate from "./CalendarDate";
import { getRemString } from "../../../../Utils/htmlUtils";
import SliderButton from "./SliderButton/SliderButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

type CalendarProps = {
	markedDates: CalendarDate[];
	onCellClick: (date: CalendarDate, marked: boolean) => void;
};

const CELL_SIZE_REMS = 4;

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

const Calendar: React.FC<CalendarProps> = ({ markedDates, onCellClick }) => {
	const calendarRef = useRef(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [numberOfColumns, setNumberOfColumns] = useState(0);
	const [columnsWithDates, setColumnsWithDates] = useState<CalendarCellModel[][]>([]);
	const [transformOffset, setTransformOffset] = useState(0);
	useEffect(() => {
		setNumberOfColumns(getNumberOfColumns(calendarRef, CELL_SIZE_REMS));
	}, []);

	useEffect(() => {
		const columns = getColumnsWithDates(numberOfColumns * pageNumber, CalendarDate.today(), markedDates);
		setColumnsWithDates(columns);
	}, [numberOfColumns, markedDates]);

	useEffect(() => {
		function updateNumberOfColumns() {
			setNumberOfColumns(getNumberOfColumns(calendarRef, CELL_SIZE_REMS));
		}

		window.addEventListener("resize", updateNumberOfColumns);

		return () => window.removeEventListener("resize", updateNumberOfColumns);
	});

	const getNumberOfColumns = (ref: any, cellSize: number) => {
		const sliderButtonColumns = 2;
		const weekDaysColumns = 1;
		const transformOffset = ref.current.clientWidth % (cellSize * 10);

		setTransformOffset(transformOffset);

		return Math.floor(ref.current.clientWidth / (cellSize * 10)) - sliderButtonColumns - weekDaysColumns;
	};

	const loadPreviousPage = () => {
		if (columnsWithDates.length / numberOfColumns === pageNumber) {
			const currentLastDate = columnsWithDates[0][0].date;
			const newLastDate = currentLastDate.addDays(-1);
			const columns = getColumnsWithDates(numberOfColumns, newLastDate, markedDates);

			setColumnsWithDates([...columns, ...columnsWithDates]);
		}

		setPageNumber(pageNumber + 1);
	};

	const columns = columnsWithDates.map((column, index) => {
		return (
			<CalendarColumn
				dates={column}
				cellSize={CELL_SIZE_REMS}
				onCellClick={onCellClick}
				index={index % numberOfColumns}
				key={index}
			/>
		);
	});

	const weekDays = weekDaysAbbr.map((weekDay, index) => (
		<div
			className={classes.WeekDay}
			key={index}
			style={{
				height: getRemString(CELL_SIZE_REMS),
				width: getRemString(CELL_SIZE_REMS),
				lineHeight: getRemString(CELL_SIZE_REMS),
			}}
		>
			{weekDay}
		</div>
	));

	const columnsStyle =
		pageNumber > 1
			? { transform: `translateX(calc(${(pageNumber - 1) * 100}% - ${(pageNumber - 1) * transformOffset}px))` }
			: undefined;

	return (
		<div className={classes.Calendar} ref={calendarRef} style={{ fontSize: getRemString(CELL_SIZE_REMS * 0.3) }}>
			<SliderButton onClick={loadPreviousPage} cellSize={CELL_SIZE_REMS}>
				<FontAwesomeIcon icon={faChevronLeft} />
			</SliderButton>
			<div className={classes.ColumnsWrapper}>
				<div className={classes.Columns} style={columnsStyle}>
					{columns}
				</div>
			</div>
			<div
				className={classes.WeekDays}
				style={{ marginTop: getRemString(CELL_SIZE_REMS), fontSize: getRemString(CELL_SIZE_REMS * 0.25) }}
			>
				{weekDays}
			</div>
			<SliderButton
				disabled={pageNumber === 1}
				onClick={() => setPageNumber(pageNumber - 1)}
				cellSize={CELL_SIZE_REMS}
			>
				<FontAwesomeIcon icon={faChevronRight} />
			</SliderButton>
		</div>
	);
};

export default Calendar;
