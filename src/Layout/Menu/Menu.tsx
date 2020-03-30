import React from "react";
import classes from "./Menu.module.css";

type MenuProps = {
	open: () => void;
};

const Menu: React.FC<MenuProps> = (props: MenuProps) => {
	return (
		<div className={classes.Menu}>
			<a href="#" className={classes.HamburgerMenu} onClick={props.open}></a>
		</div>
	);
};

export default Menu;
