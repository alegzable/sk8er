import React from "react";
import classes from "./SideDrawer.module.scss";
import Logo from "../Logo/Logo";
import NavigationItems from "./NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

type SideDrawerProps = {
	open: boolean;
	onClose: () => void;
};

const SideDrawer: React.FC<SideDrawerProps> = ({ open, onClose }) => {
	let attachedClasses = [classes.SideDrawer, classes.Close];

	if (open) {
		attachedClasses = [classes.SideDrawer, classes.Open];
	}

	return (
		<React.Fragment>
			<Backdrop show={open} onClick={onClose} />
			<div className={attachedClasses.join(" ")}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems open={open} />
				</nav>
			</div>
		</React.Fragment>
	);
};

export default SideDrawer;
