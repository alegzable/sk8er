import React from "react";
import classes from "./MyTricksListItem.module.scss";
import { MyTrick } from "../../../Tricks/Trick/TrickTypes";

type MyTricksListItemProps = {
	trick: MyTrick;
	selected: boolean;
};

const MyTricksListItem: React.FC<MyTricksListItemProps> = (props: MyTricksListItemProps) => {
	const classList = [classes.MyTricksListItem];

	if (props.selected) {
		classList.push(classes.Active);
	}

	return (
		<div className={classList.join(" ")}>
			<h3 className={classes.Header}>{props.trick.name}</h3>
		</div>
	);
};

export default MyTricksListItem;
