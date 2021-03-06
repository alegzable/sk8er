import React, { Fragment, useState } from "react";
import classes from "./Layout.module.scss";
import Toolbar from "./Toolbar/Toolbar";
import SideDrawer from "./SideDrawer/SideDrawer";

const Layout: React.FC = (props) => {
	const [showSideDrawer, toggleSideDrawer] = useState(false);

	return (
		<Fragment>
			<Toolbar openMenu={() => toggleSideDrawer(true)} />
			<SideDrawer open={showSideDrawer} onClose={() => toggleSideDrawer(false)} />
			<main className={classes.Content}>{props.children}</main>
		</Fragment>
	);
};

export default Layout;
