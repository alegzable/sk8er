import React, { PropsWithChildren } from "react";
import { Dialog as BlueprintDialog } from "@blueprintjs/core";
import classes from "./Dialog.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type DialogProps = PropsWithChildren<{
	isOpen: boolean;
	title: string;
	onClose?: () => void;
}>;

type DialogHeaderProps = {
	title: string;
	onClose?: () => void;
};
const DialogHeader: React.FC<DialogHeaderProps> = ({ title, onClose }: DialogHeaderProps) => {
	return (
		<div className={`${classes.Header} ${classes.DialogSection}`}>
			<h3 className={classes.Title}>{title}</h3>
			<button onClick={onClose} className={classes.CloseButton}>
				<FontAwesomeIcon icon={faTimes} />
			</button>
		</div>
	);
};
const Dialog: React.FC<DialogProps> = ({ isOpen, title, onClose, children }: DialogProps) => {
	return (
		<BlueprintDialog
			className={classes.Dialog}
			isOpen={isOpen}
			onClose={onClose}
			canOutsideClickClose={false}
			canEscapeKeyClose={false}
			lazy={true}
			portalClassName={classes.DialogPortal}
		>
			<DialogHeader title={title} onClose={onClose}></DialogHeader>
			{children}
		</BlueprintDialog>
	);
};

export const DialogBody: React.FC = ({ children }: PropsWithChildren<{}>) => {
	return <div className={`${classes.Body} ${classes.DialogSection}`}>{children}</div>;
};

export const DialogFooter: React.FC = ({ children }: PropsWithChildren<{}>) => {
	return <div className={`${classes.Footer} ${classes.DialogSection}`}>{children}</div>;
};

export const DialogFooterActions: React.FC = ({ children }: PropsWithChildren<{}>) => {
	return <div className={classes.Actions}>{children}</div>;
};

export default Dialog;
