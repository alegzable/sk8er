import React from "react";
import classes from "./MyTricksList.module.scss";
import MyTricksListItem from "./MyTricksListItem/MyTricksListItem";
import { MyTrick } from "../myTricksSelector";

type MyTricksListProps = {
	tricks: MyTrick[];
};

const MyTricksList: React.FC<MyTricksListProps> = (props: MyTricksListProps) => {
	const tricks = props.tricks.map((x) => (
		<li key={x.userTrickId}>
			<MyTricksListItem trick={x} />
		</li>
	));

	return (
		<div className={classes.MyTricksList}>
			<ul>{tricks}</ul>
		</div>
	);
};

export default MyTricksList;
