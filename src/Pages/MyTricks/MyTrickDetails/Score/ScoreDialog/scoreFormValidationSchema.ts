import { object, number } from "yup";
import CalendarDate from "../../Calendar/CalendarDate";
import { nameof } from "../../../../../Utils/stringUtils";
import ScoreFormFields from "./ScoreFormFields";

export const scoreFormValidationSchema = object().shape({
	[nameof<ScoreFormFields>("scoreValue")]: number()
		.required("Score is required")
		.min(0, "Min Score is 0")
		.max(10, "You wish. Max Score is 10")
		.label("Score"),
	[nameof<ScoreFormFields>("scoreDate")]: object<CalendarDate>().required("Date is required").label("Date"),
});
