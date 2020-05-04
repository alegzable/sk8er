import React, { useState, useEffect } from "react";
import classes from "./NavigationItems.module.scss";
import { MyTrick } from "../../../Pages/Tricks/Trick/TrickTypes";
import localStorageDataService from "../../../Services/LocalStorageDataService";
import { NavLink, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

type NavigationItemsProps = {
	open: boolean;
};

const NavigationItems: React.FC<NavigationItemsProps> = ({ open }) => {
	const history = useHistory();

	const [myTricks, setMyTricks] = useState<MyTrick[]>([]);
	const [myTricksExpanded, setMyTricksExpanded] = useState(true);

	useEffect(() => {
		if (open) {
			setMyTricks(localStorageDataService.getMyTricks());
		}
	}, [open]);

	const subNavigationItemsClasses = [classes.NavigationItems];

	if (!myTricksExpanded) {
		subNavigationItemsClasses.push(classes.Collapsed);
	}

	const myTricksNavigation = (
		<ul className={subNavigationItemsClasses.join(" ")}>
			{myTricks.map((x) => (
				<li className={classes.NavigationSubItem}>
					<NavLink key={x.id} to={`/my-tricks/${x.id}`} activeClassName={classes.Active}>
						{x.name}
					</NavLink>
				</li>
			))}
		</ul>
	);

	const myTricksActive = history.location.pathname.includes("/my-tricks");
	const myTricksClasses = [classes.NavigationItemTitle];

	if (myTricksActive) {
		myTricksClasses.push(classes.Active);
	}

	const myTricksNav =
		myTricks.length > 0 ? (
			<li className={classes.NavigationItem}>
				<span className={myTricksClasses.join(" ")} onClick={() => setMyTricksExpanded(!myTricksExpanded)}>
					<span>My Tricks</span>{" "}
					<FontAwesomeIcon icon={myTricksExpanded ? faAngleUp : faAngleDown}></FontAwesomeIcon>
				</span>
				{myTricksNavigation}
			</li>
		) : (
			<li className={classes.NavigationItem}>
				<NavLink to="/my-tricks/" activeClassName={classes.Active}>
					My Tricks
				</NavLink>
			</li>
		);

	return (
		<ul className={classes.NavigationItems}>
			<li className={classes.NavigationItem}>
				<NavLink to="/" exact activeClassName={classes.Active}>
					Tricks
				</NavLink>
			</li>
			{myTricksNav}
		</ul>
	);
};

export default NavigationItems;
