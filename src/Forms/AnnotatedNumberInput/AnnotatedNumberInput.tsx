import React, { useRef, useState, ChangeEvent } from "react";
import classes from "./AnnotatedNumberInput.module.scss";

type AnnotatedNumberInputProps = {
	value?: number;
	name: string;
	id?: string;
	annotation?: string;
	onChange: (value?: number) => void;
};

const AnnotatedNumberInput: React.FC<AnnotatedNumberInputProps> = ({ value, name, id, annotation, onChange }) => {
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

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === "") {
			onChange(undefined);
		} else {
			onChange(+e.target.value);
		}
	};

	return (
		<div className={classNames.join(" ")} onClick={onClick}>
			<input
				ref={inputRef}
				type="number"
				name={name}
				value={value}
				id={id}
				className={classes.AnnotatedNumberInput}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				onChange={handleOnChange}
			/>
			<span className={classes.Annotation}>{annotation}</span>
		</div>
	);
};

export default AnnotatedNumberInput;
