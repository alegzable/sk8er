import React from "react";
import classes from "./MyTricks.module.scss";

type MyTricksProps = {};

const MyTricks: React.FC<MyTricksProps> = (props: MyTricksProps) => {
	return <div className={classes.MyTricks}>BARDZO BRZYDKIE SŁOWO</div>;
};

export default MyTricks;
