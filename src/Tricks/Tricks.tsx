import React, { useState } from "react";
import classes from "./Tricks.module.css";
import Trick from "./Trick/Trick";

type TricksProps = {};

const Tricks: React.FC<TricksProps> = (props: TricksProps) => {
	const [tricks, updateTricks] = useState([
		{ id: 1, name: "Shove It", videoUrl: "https://www.youtube.com/embed/2O2_UZfH5SU" },
		{ id: 2, name: "Ollie", videoUrl: "https://www.youtube.com/embed/VasSLuFO4wY" },
		{ id: 3, name: "Kick Flip", videoUrl: "https://www.youtube.com/embed/YOf0XeI7KzU" }
	]);

	const trickList = tricks.map(trick => <Trick key={trick.id} name={trick.name} videoUrl={trick.videoUrl} />);
	return <div className={classes.Tricks}>{trickList}</div>;
};

export default Tricks;
