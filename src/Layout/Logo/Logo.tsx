import React from "react";
import classes from "./Logo.module.scss";

const Logo: React.FC = () => {
	return (
		<span className={classes.Logo}>
			sk<span>&#8734;</span>er
		</span>
	);
};

export default Logo;
