import React from "react";
import { DateInput } from "@blueprintjs/datetime";
import { IPopoverProps, IInputGroupProps } from "@blueprintjs/core/lib/esm/components";
import { HTMLInputProps } from "@blueprintjs/core/lib/esm/common";
import "./DatePicker.module.scss";
import CalendarDate from "../../Pages/MyTricks/MyTrickDetails/Calendar/CalendarDate";
import { dateBoundaries, dateFormats, formatDate, parseDate } from "../../Utils/dateUtils";
import classes from "./DatePicker.module.scss";

type Props = {
	value?: CalendarDate;
	inputName: string;
	onChange: (value?: CalendarDate) => void;
	inputClassName?: string;
	inputId?: string;
	max?: CalendarDate;
};

const DatePicker: React.FC<Props> = ({ value, inputName, onChange, inputClassName, inputId, max }) => {
	const handleOnChange = (selectedDate: Date): void => {
		if (selectedDate === null) {
			onChange(undefined);
		} else {
			onChange(CalendarDate.fromDate(selectedDate));
		}
	};

	const popoverProps: Partial<IPopoverProps> = {
		minimal: true,
		boundary: "viewport",
		portalClassName: classes.DatePickerPortal,
	};

	const inputProps: HTMLInputProps & IInputGroupProps = {
		className: inputClassName,
		id: inputId,
		name: inputName,
	};

	const maxDate = max?.getDate() ?? dateBoundaries.max;

	return (
		<DateInput
			onChange={handleOnChange}
			showActionsBar={true}
			fill={true}
			inputProps={inputProps}
			formatDate={formatDate}
			parseDate={parseDate}
			placeholder={dateFormats.date}
			minDate={dateBoundaries.min}
			maxDate={maxDate}
			value={value?.getDate()}
			popoverProps={popoverProps}
			className={classes.DatePicker}
		/>
	);
};

export default DatePicker;
