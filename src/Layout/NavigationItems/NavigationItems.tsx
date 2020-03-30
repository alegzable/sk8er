import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems: React.FC = () => {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link="/" active>
				Tricks
			</NavigationItem>
			<NavigationItem link="/">My Tricks</NavigationItem>
		</ul>
	);
};

export default NavigationItems;
