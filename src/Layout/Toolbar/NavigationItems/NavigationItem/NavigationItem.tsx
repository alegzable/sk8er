import React, { PropsWithChildren } from "react";
import classes from "./NavigationItem.module.scss";
import { NavLink } from "react-router-dom";

type NavigationItemProps = {
	link: string;
	exact?: boolean;
};

const NavigationItem: React.FC<NavigationItemProps> = (props: PropsWithChildren<NavigationItemProps>) => {
	return (
		<li className={classes.NavigationItem}>
			<NavLink to={props.link} exact={props.exact} activeClassName={classes.Active}>
				{props.children}
			</NavLink>
		</li>
	);
};

export default NavigationItem;
