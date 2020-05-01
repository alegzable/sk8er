import React, { useContext } from "react";
import CalendarDate from "../../../Calendar/CalendarDate";
import DatePicker from "../../../../../../Forms/DatePicker/DatePicker";
import AnnotatedNumberInput from "../../../../../../Forms/AnnotatedNumberInput/AnnotatedNumberInput";
import { ScoreDialogContext } from "../ScoreDialog";
import { MaybeDailyScore } from "../../DailyScore";
import classes from "./ScoreForm.module.scss";
import formClasses from "../../../../../../styles/Forms.module.scss";

type ScoreForm = {
	trickName: string;
};

const ScoreForm: React.FC<ScoreForm> = ({ trickName }) => {
	const scoreContext = useContext(ScoreDialogContext);
	const scoreDate = scoreContext.dailyScore?.date;
	const scoreValue = scoreContext.dailyScore?.score;

	const onDateChanged = (date: CalendarDate) => {
		scoreContext.setDailyScore?.(new MaybeDailyScore(date, scoreValue));
	};

	const onValueChanged = (value: number) => {
		scoreContext.setDailyScore?.(new MaybeDailyScore(scoreDate, value));
	};

	return (
		<div className={classes.SuccessRateForm}>
			<div className={classes.Description}>
				<p>Been practicing for a while? Rate yourself!</p>
				<p>Try performing {trickName} 10 times in a row and see how many were successful!</p>
				<p>Your scores will be displayed in a graph to show your progress over time.</p>
			</div>
			<div className={classes.Inputs}>
				<div className={formClasses.FormGroup}>
					<label htmlFor="date">Date</label>
					<DatePicker value={scoreDate} onChange={onDateChanged} inputId="date" />
				</div>
				<div className={formClasses.FormGroup}>
					<label htmlFor="score">Score</label>
					<AnnotatedNumberInput
						value={scoreValue}
						min={0}
						max={10}
						id="score"
						annotation="/ 10"
						onChange={onValueChanged}
					/>
				</div>
			</div>
		</div>
	);
};

export default ScoreForm;
