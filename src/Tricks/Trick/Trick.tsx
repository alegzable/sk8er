import React from "react";
import classes from "./Trick.module.css";

type TrickProps = {
	name: string;
	videoUrl: string;
};

const Trick: React.FC<TrickProps> = (props: TrickProps) => {
	return (
		<div className={classes.Trick}>
			<h2>{props.name}</h2>
			<div className={classes.IFrameContainer}>
				<iframe
					src={props.videoUrl}
					frameBorder="0"
					allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					className={classes.IFrame}
				></iframe>
			</div>
		</div>
	);
};

export default Trick;
