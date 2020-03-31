import React from "react";
import classes from "./HamburgerMenu.module.css";

type HamburgerMenuProps = {
	open: () => void;
};

const HamburgerMenu: React.FC<HamburgerMenuProps> = (props: HamburgerMenuProps) => {
	return (
		<div className={classes.HamburgerMenu}>
			<a href="#" onClick={props.open}></a>
		</div>
	);
};

export default HamburgerMenu;
