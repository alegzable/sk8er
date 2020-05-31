import React, { useContext, useState, useEffect } from "react";
import classes from "./PreLoader.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Backdrop from "../Backdrop/Backdrop";

export const usePreLoader = (loading: boolean) => {
	const showPreLoader = useContext(PreLoaderContext);

	useEffect(() => {
		showPreLoader(loading);
	}, [showPreLoader, loading]);
};

const PreLoaderContext = React.createContext<(show: boolean) => void>(() => {});

const PreLoader: React.FC = ({ children }) => {
	const [show, setShow] = useState(false);

	return (
		<PreLoaderContext.Provider value={setShow}>
			<Backdrop show={show}>
				<FontAwesomeIcon icon={faSpinner} className={classes.Spinner} />
			</Backdrop>
			{children}
		</PreLoaderContext.Provider>
	);
};

export default PreLoader;
