import React from "react";
import classes from "./MyTricksList.module.scss";
import { MyTrick } from "../../Tricks/Trick/TrickTypes";
import MyTricksListItem from "./MyTricksListItem/MyTricksListItem";

type MyTricksListProps = {
	tricks: MyTrick[];
	selectedTrick?: MyTrick;
	selectedTrickChanged: (id: number) => void;
};

const MyTricksList: React.FC<MyTricksListProps> = (props: MyTricksListProps) => {
	const tricks = props.tricks.map((x) => (
		<li key={x.id} onClick={() => props.selectedTrickChanged(x.id)}>
			<MyTricksListItem trick={x} selected={x.id === props.selectedTrick?.id} />
		</li>
	));

	return (
		<div className={classes.MyTricksList}>
			<ul>{tricks}</ul>
		</div>
	);
};

export default MyTricksList;
