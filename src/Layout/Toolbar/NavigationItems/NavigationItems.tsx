import React from "react";
import classes from "./NavigationItems.module.scss";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems: React.FC = () => {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link="/" exact>
				Tricks
			</NavigationItem>
			<NavigationItem link="/my-tricks">My Tricks</NavigationItem>
		</ul>
	);
};

export default NavigationItems;
