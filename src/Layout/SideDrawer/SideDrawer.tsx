import React from "react";
import classes from "./SideDrawer.module.css";
import Logo from "../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

type SideDrawerProps = {
	open: boolean;
	closed: () => void;
};

const SideDrawer: React.FC<SideDrawerProps> = (props: SideDrawerProps) => {
	let attachedClasses = [classes.SideDrawer, classes.Close];

	if (props.open) {
		attachedClasses = [classes.SideDrawer, classes.Open];
	}

	return (
		<React.Fragment>
			<Backdrop show={props.open} onClick={props.closed} />
			<div className={attachedClasses.join(" ")}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</React.Fragment>
	);
};

export default SideDrawer;
