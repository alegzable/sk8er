import React from "react";
import classes from "./MyTrickDetails.module.scss";
import { MyTrick } from "../../Tricks/Trick/TrickTypes";
import Video from "../../Tricks/Trick/Video/Video";
import Trick from "../../Tricks/Trick/Trick";

type MyTrickDetailsProps = {
	trick?: MyTrick;
};

const MyTrickDetails: React.FC<MyTrickDetailsProps> = (props: MyTrickDetailsProps) => {
	const details = props.trick ? (
		<>
			<h2>{props.trick.name}</h2>
			<div className={classes.Video}>
				<Video url={props.trick.videoUrl} title={props.trick.name} />
			</div>
		</>
	) : null;

	return <div className={classes.MyTrickDetails}>{details}</div>;
};

export default MyTrickDetails;
