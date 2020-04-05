import React from "react";
import classes from "./Video.module.scss";

type VideoProps = {
	url: string;
	title: string;
};

const Video: React.FC<VideoProps> = (props: VideoProps) => {
	return (
		<div className={classes.Video}>
			<iframe
				src={props.url}
				frameBorder="0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				className={classes.IFrame}
				title={props.title}
			></iframe>
		</div>
	);
};

export default Video;
