import React, { PropsWithChildren } from "react";
import classes from "./Backdrop.module.scss";

type BackdropProps = {
	show: boolean;
	onClick?: () => void;
};

const Backdrop: React.FC<PropsWithChildren<BackdropProps>> = ({ show, onClick, children }) =>
	show ? (
		<div className={classes.Backdrop} onClick={onClick}>
			{children}
		</div>
	) : null;

export default Backdrop;
