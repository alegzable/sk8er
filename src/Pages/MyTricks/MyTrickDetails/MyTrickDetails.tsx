import React from "react";
import classes from "./MyTrickDetails.module.scss";
import { MyTrick } from "../../Tricks/Trick/TrickTypes";

type MyTrickDetailsProps = {
	trick?: MyTrick;
};

const MyTrickDetails: React.FC<MyTrickDetailsProps> = (props: MyTrickDetailsProps) => {
	return (
		<div className={classes.MyTrickDetails}>
			<h2>{props.trick?.name}</h2>
		</div>
	);
};

export default MyTrickDetails;
