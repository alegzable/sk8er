import React from "react";
import classes from "./HamburgerMenu.module.scss";

type HamburgerMenuProps = {
	open: () => void;
};

const HamburgerMenu: React.FC<HamburgerMenuProps> = (props: HamburgerMenuProps) => {
	return (
		<div className={classes.HamburgerMenu}>
			<button onClick={props.open}></button>
		</div>
	);
};

export default HamburgerMenu;
