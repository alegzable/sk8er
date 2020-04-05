import React from "react";
import classes from "./Trick.module.scss";
import Video from "./Video/Video";

type TrickProps = {
	name: string;
	videoUrl: string;
};

const Trick: React.FC<TrickProps> = (props: TrickProps) => {
	return (
		<div className={classes.Trick}>
			<h2>{props.name}</h2>
			<Video url={props.videoUrl} title={props.name} />
		</div>
	);
};

export default Trick;
