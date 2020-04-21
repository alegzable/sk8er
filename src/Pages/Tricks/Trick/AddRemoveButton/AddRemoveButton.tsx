import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import classes from "./AddRemoveButton.module.scss";

type ActionTypes = "add" | "remove";
const icons: [ActionTypes, IconDefinition][] = [
	["add", faPlus],
	["remove", faMinus],
];
type AddRemoveButtonProps = {
	actionType: ActionTypes;
	title: string;
	handleOnClick: () => void;
};

const AddRemoveButton: React.FC<AddRemoveButtonProps> = (props: AddRemoveButtonProps) => {
	const icon = (icons.find((actionIconPair) => actionIconPair[0] === props.actionType) as [
		ActionTypes,
		IconDefinition
	])[1];

	return (
		<button className={classes.AddRemoveButton} onClick={props.handleOnClick} title={props.title}>
			<FontAwesomeIcon icon={icon} />
		</button>
	);
};

export default AddRemoveButton;
