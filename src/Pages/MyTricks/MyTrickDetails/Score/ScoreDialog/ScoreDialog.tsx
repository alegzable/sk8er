import React, { useState } from "react";
import Dialog, { DialogBody, DialogFooter, DialogFooterActions } from "../../../../../UI/Backdrop/Dialog/Dialog";
import ScoreForm from "./ScoreForm/ScoreForm";
import classes from "./ScoreDialog.module.scss";
import CalendarDate from "../../Calendar/CalendarDate";
import { MaybeDailyScore } from "../DailyScore";

type ScoreDialogProps = {
	isOpen: boolean;
	trickId: number;
	trickName: string;
	onClose: () => void;
};

const ScoreDialog: React.FC<ScoreDialogProps> = ({ isOpen, trickId, trickName, onClose }) => {
	const [dailyScore, setDailyScore] = useState<MaybeDailyScore>(new MaybeDailyScore(CalendarDate.today()));

	return (
		<Dialog isOpen={isOpen} title="Add Score" onClose={onClose}>
			<DialogBody>
				<ScoreDialogContext.Provider value={{ dailyScore, setDailyScore }}>
					<ScoreForm trickName={trickName} />
				</ScoreDialogContext.Provider>
			</DialogBody>
			<DialogFooter>
				<DialogFooterActions>
					<button className={classes.SaveButton} onClick={onClose}>
						Save
					</button>
				</DialogFooterActions>
			</DialogFooter>
		</Dialog>
	);
};

export default ScoreDialog;

export const ScoreDialogContext = React.createContext<{
	dailyScore?: MaybeDailyScore;
	setDailyScore?: React.Dispatch<React.SetStateAction<MaybeDailyScore>>;
}>({});
