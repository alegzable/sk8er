import React from "react";
import Dialog, { DialogBody, DialogFooter, DialogFooterActions } from "../../../../../UI/Backdrop/Dialog/Dialog";
import classes from "./ScoreDialog.module.scss";
import formClasses from "../../../../../styles/Forms.module.scss";
import CalendarDate from "../../Calendar/CalendarDate";
import { scoreFormValidationSchema } from "./scoreFormValidationSchema";
import AnnotatedNumberInput from "../../../../../Forms/AnnotatedNumberInput/AnnotatedNumberInput";
import { useFormik } from "formik";
import DatePicker from "../../../../../Forms/DatePicker/DatePicker";
import { nameof } from "../../../../../Utils/stringUtils";
import ScoreFormFields from "./ScoreFormFields";
import ErrorMessage from "../../../../../Forms/ErrorMessage/ErrorMessage";
import SubmitButton from "../../../../../Forms/SubmitButton/SubmitButton";
import { MyTrick } from "../../../../Tricks/Trick/TrickTypes";

type ScoreDialogProps = {
	isOpen: boolean;
	trick: MyTrick;
	onClose: () => void;
	onSave: (date: CalendarDate, score: number) => void;
};

const ScoreDialog: React.FC<ScoreDialogProps> = ({ isOpen, trick, onClose, onSave }) => {
	const saveScore = (score: ScoreFormFields) => {
		onSave(score.scoreDate as CalendarDate, score.scoreValue as number);
	};

	const getScore = (date: CalendarDate): number | undefined => {
		return trick.practiceDates?.find((x) => x.date.equals(date))?.score;
	};

	const getInitialValues = (): ScoreFormFields => {
		const today = CalendarDate.today();
		const score = getScore(today);

		return { scoreDate: today, scoreValue: score };
	};

	const formik = useFormik<ScoreFormFields>({
		initialValues: getInitialValues(),
		validationSchema: scoreFormValidationSchema,
		onSubmit: saveScore,
	});

	const onDateChanged = (value?: CalendarDate) => {
		formik.setFieldValue(nameof<ScoreFormFields>("scoreDate"), value);

		if (value !== undefined) {
			const score = getScore(value);

			formik.setFieldValue(nameof<ScoreFormFields>("scoreValue"), score ?? "");
		}
	};

	return (
		<Dialog isOpen={isOpen} title="Add Score" onClose={onClose}>
			<form onSubmit={formik.handleSubmit}>
				<DialogBody>
					<div>
						<div className={classes.Description}>
							<p>Been practicing for a while? Rate yourself!</p>
							<p>Try performing {trick.name} 10 times in a row and see how many were successful!</p>
							<p>Your scores will be displayed in a graph to show your progress over time.</p>
						</div>
						<div className={classes.Inputs}>
							<div className={formClasses.FormGroup}>
								<label htmlFor={nameof<ScoreFormFields>("scoreDate")}>Date</label>
								<DatePicker
									value={formik.values.scoreDate}
									onChange={onDateChanged}
									inputName={nameof<ScoreFormFields>("scoreDate")}
									inputId={nameof<ScoreFormFields>("scoreDate")}
								/>
								<ErrorMessage value={formik.errors.scoreDate}></ErrorMessage>
							</div>
							<div className={formClasses.FormGroup}>
								<label htmlFor={nameof<ScoreFormFields>("scoreValue")}>Score</label>
								<AnnotatedNumberInput
									value={formik.values.scoreValue}
									name={nameof<ScoreFormFields>("scoreValue")}
									id={nameof<ScoreFormFields>("scoreValue")}
									annotation="/ 10"
									onChange={(value) =>
										formik.setFieldValue(nameof<ScoreFormFields>("scoreValue"), value)
									}
								/>
								<ErrorMessage value={formik.errors.scoreValue}></ErrorMessage>
							</div>
						</div>
					</div>
				</DialogBody>
				<DialogFooter>
					<DialogFooterActions>
						<SubmitButton formik={formik} />
					</DialogFooterActions>
				</DialogFooter>
			</form>
		</Dialog>
	);
};

export default ScoreDialog;
