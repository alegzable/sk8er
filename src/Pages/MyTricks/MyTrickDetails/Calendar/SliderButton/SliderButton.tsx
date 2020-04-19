import React from "react";
import classes from "./SliderButton.module.scss";
import { getRemString } from "../../../../../Utils/htmlUtils";

type SliderButtonProps = {
	cellSize: number;
	disabled?: boolean;
	onClick: () => void;
};

const SliderButton: React.FC<React.PropsWithChildren<SliderButtonProps>> = ({
	children,
	cellSize,
	disabled,
	onClick,
}) => {
	return (
		<button
			disabled={disabled}
			className={classes.SliderButton}
			onClick={onClick}
			style={{ fontSize: getRemString(cellSize * 0.5), minWidth: getRemString(cellSize) }}
		>
			{children}
		</button>
	);
};

export default SliderButton;
