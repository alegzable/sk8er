import React from "react";
import Dialog, { DialogBody, DialogFooter, DialogFooterActions } from "../../../../../UI/Backdrop/Dialog/Dialog";
import classes from "./ScoreDialog.module.scss";
import formClasses from "../../../../../styles/Forms.module.scss";
import CalendarDate from "../../Calendar/CalendarDate";
import DailyScore from "../DailyScore";
import localStorageDataService from "../../../../../Services/LocalStorageDataService";
import { scoreFormValidationSchema } from "./scoreFormValidationSchema";
import AnnotatedNumberInput from "../../../../../Forms/AnnotatedNumberInput/AnnotatedNumberInput";
import { useFormik } from "formik";
import DatePicker from "../../../../../Forms/DatePicker/DatePicker";
import { nameof } from "../../../../../Utils/stringUtils";
import ScoreFormFields from "./ScoreFormFields";
import ErrorMessage from "../../../../../Forms/ErrorMessage/ErrorMessage";
import SubmitButton from "../../../../../Forms/SubmitButton/SubmitButton";
import { useHistory } from "react-router-dom";

type ScoreDialogProps = {
	isOpen: boolean;
	trickId: number;
	trickName: string;
	onClose: () => void;
};

const ScoreDialog: React.FC<ScoreDialogProps> = ({ isOpen, trickId, trickName, onClose }) => {
	const history = useHistory();

	const saveScore = (score: ScoreFormFields) => {
		localStorageDataService.updateTrickScore(
			trickId,
			new DailyScore(score.scoreDate as CalendarDate, score.scoreValue as number)
		);

		history.push(`/my-tricks/${trickId}`);
	};

	const getInitialValues = (): ScoreFormFields => {
		const today = CalendarDate.today();
		const dailyScore = localStorageDataService.getTrickScore(trickId, today);

		return { scoreDate: dailyScore?.date ?? today, scoreValue: dailyScore?.value };
	};

	const formik = useFormik<ScoreFormFields>({
		initialValues: getInitialValues(),
		validationSchema: scoreFormValidationSchema,
		onSubmit: saveScore,
	});

	const onDateChanged = (value?: CalendarDate) => {
		formik.setFieldValue(nameof<ScoreFormFields>("scoreDate"), value);

		if (value !== undefined) {
			const dailyScore = localStorageDataService.getTrickScore(trickId, value);

			if (dailyScore !== undefined) {
				formik.setFieldValue(nameof<ScoreFormFields>("scoreValue"), dailyScore.value);
			}
		}
	};

	return (
		<Dialog isOpen={isOpen} title="Add Score" onClose={onClose}>
			<form onSubmit={formik.handleSubmit}>
				<DialogBody>
					<div>
						<div className={classes.Description}>
							<p>Been practicing for a while? Rate yourself!</p>
							<p>Try performing {trickName} 10 times in a row and see how many were successful!</p>
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
