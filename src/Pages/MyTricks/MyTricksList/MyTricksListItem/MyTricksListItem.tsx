import React from "react";
import classes from "./MyTricksListItem.module.scss";
import { NavLink } from "react-router-dom";
import { MyTrick } from "../../myTricksSelector";

type MyTricksListItemProps = {
	trick: MyTrick;
};

const MyTricksListItem: React.FC<MyTricksListItemProps> = ({ trick }) => {
	return (
		<NavLink
			to={`/my-tricks/${trick.userTrickId}`}
			className={classes.MyTricksListItem}
			activeClassName={classes.Active}
		>
			<span className={classes.Title}>{trick.name}</span>
		</NavLink>
	);
};

export default MyTricksListItem;
