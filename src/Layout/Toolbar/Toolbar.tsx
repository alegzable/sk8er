import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import HamburherMenu from "../HamburgerMenu/HamburgerMenu";

type ToolbarProps = {
	openMenu: () => void;
};

const Toolbar: React.FC<ToolbarProps> = (props: ToolbarProps) => {
	return (
		<header className={classes.Toolbar}>
			<HamburherMenu open={props.openMenu} />
			<Logo />
			<nav className={classes.DesktopOnly}>
				<NavigationItems />
			</nav>
		</header>
	);
};

export default Toolbar;
