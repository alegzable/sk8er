import React, { useState } from "react";
import classes from "./NavigationItems.module.scss";
import { NavLink, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import myTricksSelector from "../../../Pages/MyTricks/myTricksSelector";

const NavigationItems: React.FC = () => {
	const history = useHistory();
	const { data: myTricks } = useSelector(myTricksSelector);

	const [myTricksExpanded, setMyTricksExpanded] = useState(true);

	const subNavigationItemsClasses = [classes.NavigationItems];

	if (!myTricksExpanded) {
		subNavigationItemsClasses.push(classes.Collapsed);
	}

	const myTricksNavigation = (
		<ul className={subNavigationItemsClasses.join(" ")}>
			{myTricks.map((x) => (
				<li className={classes.NavigationSubItem}>
					<NavLink key={x.userTrickId} to={`/my-tricks/${x.userTrickId}`} activeClassName={classes.Active}>
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
