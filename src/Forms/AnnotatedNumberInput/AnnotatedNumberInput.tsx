import React, { useRef, useState } from "react";
import classes from "./AnnotatedNumberInput.module.scss";

type AnnotatedNumberInputProps = {
	value?: number;
	min?: number;
	max?: number;
	id?: string;
	annotation?: string;
	onChange: (value: number) => void;
};

const AnnotatedNumberInput: React.FC<AnnotatedNumberInputProps> = ({ value, min, max, id, annotation, onChange }) => {
	const [focused, setFocused] = useState(false);
	const inputRef = useRef<any>(null);

	const classNames = [classes.AnnotatedNumberInputContainer];

	if (focused) {
		classNames.push(classes.Focused);
	}

	const onClick = () => {
		inputRef.current?.focus();
		setFocused(true);
	};

	return (
		<div className={classNames.join(" ")} onClick={onClick}>
			<input
				ref={inputRef}
				type="number"
				value={value || ""}
				min={min}
				max={max}
				id={id}
				className={classes.AnnotatedNumberInput}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				onChange={(e) => onChange(+e.target.value)}
			/>
			<span className={classes.Annotation}>{annotation}</span>
		</div>
	);
};

export default AnnotatedNumberInput;
