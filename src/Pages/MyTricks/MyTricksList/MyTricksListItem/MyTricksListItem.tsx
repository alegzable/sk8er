import React from "react";
import classes from "./MyTricksListItem.module.scss";
import { MyTrick } from "../../../Tricks/Trick/TrickTypes";
import { NavLink } from "react-router-dom";

type MyTricksListItemProps = {
	trick: MyTrick;
};

const MyTricksListItem: React.FC<MyTricksListItemProps> = ({ trick }) => {
	return (
		<NavLink to={`/my-tricks/${trick.id}`} className={classes.MyTricksListItem} activeClassName={classes.Active}>
			<span className={classes.Title}>{trick.name}</span>
		</NavLink>
	);
};

export default MyTricksListItem;
