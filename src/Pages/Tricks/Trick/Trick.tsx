import React from "react";
import classes from "./Trick.module.scss";
import Video from "./Video/Video";
import AddRemoveButton from "./AddRemoveButton/AddRemoveButton";

type TrickProps = {
	id: number;
	name: string;
	videoUrl: string;
	checkIfAdded: (id: number) => boolean;
	setAdded: (id: number, added: boolean) => void;
};

const Trick: React.FC<TrickProps> = (props: TrickProps) => {
	const added = props.checkIfAdded(props.id);
	const actionType = added ? "remove" : "add";

	return (
		<div className={classes.Trick}>
			<div className={classes.Header}>
				<h2>{props.name}</h2>
				<AddRemoveButton actionType={actionType} handleOnClick={() => props.setAdded(props.id, !added)} />
			</div>
			<Video url={props.videoUrl} title={props.name} />
		</div>
	);
};

export default Trick;
