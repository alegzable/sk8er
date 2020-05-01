import React from "react";
import { DateInput } from "@blueprintjs/datetime";
import { IPopoverProps, IInputGroupProps } from "@blueprintjs/core/lib/esm/components";
import { HTMLInputProps } from "@blueprintjs/core/lib/esm/common";
import "./DatePicker.module.scss";
import CalendarDate from "../../Pages/MyTricks/MyTrickDetails/Calendar/CalendarDate";
import { dateBoundaries, dateFormat, formatDate, parseDate } from "../../Utils/dateUtils";
import classes from "./DatePicker.module.scss";

type Props = {
	value?: CalendarDate;
	onChange: (value?: CalendarDate) => void;
	inputClassName?: string;
	inputId?: string;
};

const DatePicker: React.FC<Props> = ({ value, onChange, inputClassName, inputId }) => {
	const handleOnChange = (selectedDate: Date): void => {
		if (selectedDate === null) {
			return;
		}

		onChange(CalendarDate.fromDate(selectedDate));
	};

	const popoverProps: Partial<IPopoverProps> = {
		minimal: true,
		boundary: "viewport",
		portalClassName: classes.DatePickerPortal,
	};

	const inputProps: HTMLInputProps & IInputGroupProps = {
		className: inputClassName,
		id: inputId,
	};

	return (
		<DateInput
			onChange={handleOnChange}
			showActionsBar={true}
			fill={true}
			inputProps={inputProps}
			formatDate={formatDate}
			parseDate={parseDate}
			placeholder={dateFormat}
			minDate={dateBoundaries.min}
			maxDate={dateBoundaries.max}
			value={value?.getDate()}
			popoverProps={popoverProps}
			className={classes.DatePicker}
		/>
	);
};

export default DatePicker;
