import React from "react";
import classes from "./ErrorMessage.module.scss";

type ErrorMessageProps = {
	value?: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ value }: ErrorMessageProps) => {
	return <span className={classes.ErrorMessage}>{value}</span>;
};

export default ErrorMessage;
