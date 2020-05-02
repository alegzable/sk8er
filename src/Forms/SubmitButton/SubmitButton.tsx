import React, { PropsWithChildren } from "react";
import { FormikValues } from "formik";
import classes from "./SubmitButton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

type SubmitButtonProps = {
	formik: FormikValues;
};

export const SubmitButton: React.FC<SubmitButtonProps> = ({ formik }: PropsWithChildren<SubmitButtonProps>) => {
	const disabled = formik.isValidating || formik.isSubmitting || !formik.isValid;
	let icon = undefined;
	let text = "Save";

	if (formik.isSubmitting || formik.isValidating) {
		icon = <FontAwesomeIcon icon={faSpinner} className={classes.Spinner} />;
		text = "Saving";
	}

	return (
		<button type="submit" disabled={disabled} className={classes.SubmitButton}>
			{text} {icon}
		</button>
	);
};

export default SubmitButton;
