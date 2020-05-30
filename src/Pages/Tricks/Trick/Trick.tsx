import React from "react";
import classes from "./Trick.module.scss";
import Video from "./Video/Video";
import AddRemoveButton from "./AddRemoveButton/AddRemoveButton";

type TrickProps = {
	id: string;
	name: string;
	videoUrl: string;
	added: boolean;
	addToMyTricks: (id: string) => void;
	removeFromMyTricks: (id: string) => void;
};

const Trick: React.FC<TrickProps> = (props: TrickProps) => {
	const actionType = props.added ? "remove" : "add";
	const buttonTitle = props.added ? "Remove from My Tricks" : "Add to My Tricks";
	const clickHandler = props.added ? props.removeFromMyTricks : props.addToMyTricks;

	return (
		<div className={classes.Trick}>
			<div className={classes.Header}>
				<h2>{props.name}</h2>
				<AddRemoveButton
					actionType={actionType}
					handleOnClick={() => clickHandler(props.id)}
					title={buttonTitle}
				/>
			</div>
			<Video url={props.videoUrl} title={props.name} />
		</div>
	);
};

export default Trick;
