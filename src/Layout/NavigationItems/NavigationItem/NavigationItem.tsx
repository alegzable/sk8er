import React, { PropsWithChildren } from "react";
import classes from "./NavigationItem.module.css";

type NavigationItemProps = {
	link: string;
	active?: boolean;
};

const NavigationItem: React.FC<NavigationItemProps> = (props: PropsWithChildren<NavigationItemProps>) => {
	return (
		<li className={classes.NavigationItem}>
			<a href={props.link} className={props.active ? classes.active : ""}>
				{props.children}
			</a>
		</li>
	);
};

export default NavigationItem;
