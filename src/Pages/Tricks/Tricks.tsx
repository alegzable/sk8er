import React, { useState } from "react";
import classes from "./Tricks.module.scss";
import Trick from "./Trick/Trick";

type TricksProps = {};

const Tricks: React.FC<TricksProps> = (props: TricksProps) => {
	const [tricks, setTricks] = useState([
		{ id: 1, name: "Shove It", videoUrl: "https://www.youtube.com/embed/2O2_UZfH5SU", added: false },
		{ id: 2, name: "Ollie", videoUrl: "https://www.youtube.com/embed/VasSLuFO4wY", added: false },
		{ id: 3, name: "Heel Flip", videoUrl: "https://www.youtube.com/embed/phsJk5_jHkU", added: false },
		{ id: 3, name: "Kick Flip", videoUrl: "https://www.youtube.com/embed/YOf0XeI7KzU", added: false },
	]);

	const getTrick = (tricks: any[], id: number) => {
		const trick = tricks.find((x) => x.id === id);

		if (trick === undefined) {
			throw new Error(`Trick with id ${id} does not exist`);
		}

		return trick;
	};
	const checkIfAdded = (id: number) => {
		const trick = getTrick(tricks, id);

		return trick.added;
	};
	const setAdded = (id: number, added: boolean) => {
		const tricksCopy = [...tricks];
		const trick = getTrick(tricksCopy, id);

		trick.added = added;
		setTricks(tricksCopy);
	};
	const trickList = tricks.map((trick) => (
		<Trick
			key={trick.id}
			id={trick.id}
			name={trick.name}
			videoUrl={trick.videoUrl}
			checkIfAdded={checkIfAdded}
			setAdded={setAdded}
		/>
	));
	return <div className={classes.Tricks}>{trickList}</div>;
};

export default Tricks;
