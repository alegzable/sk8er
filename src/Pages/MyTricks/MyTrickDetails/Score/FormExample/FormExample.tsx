import { useFormik } from "formik";
import React, { ChangeEvent } from "react";
import DatePicker from "../../../../../Forms/DatePicker/DatePicker";
import CalendarDate from "../../Calendar/CalendarDate";

type FormExampleFields = {
	val1: number;
	val2: string;
	date: CalendarDate;
	obj: { v: string };
};

export const FormExample: React.FC = () => {
	const onSubmit = (values: FormExampleFields) => {
		console.log(values);
	};

	const formik = useFormik<FormExampleFields>({
		initialValues: {
			val1: 0,
			val2: "5345",
			date: CalendarDate.today(),
			obj: { v: "ad" },
		},
		onSubmit: onSubmit,
	});
	console.log(formik.values);

	// const onNumberChange = (e: ChangeEvent) => {
	//     formik.setFieldValue(+e.target.value)
	// }

	return (
		<form onSubmit={formik.handleSubmit}>
			<label htmlFor="date">Date</label>
			<DatePicker
				value={formik.values.date}
				onChange={(value) => formik.setFieldValue("scoreDate", value)}
				inputName="scoreDate"
				inputId="scoreDate"
			/>
			<label>Val1</label>
			<input
				id="val1"
				name="val1"
				type="number"
				onChange={(e) => formik.setFieldValue("val1", +e.target.value)}
				value={formik.values.val1}
			/>
			<label>Val2</label>
			<input id="val2" name="val2" onChange={formik.handleChange} value={formik.values.val2} />
			<label>obj</label>
			<input
				id="obj"
				name="obj"
				onChange={(e) => formik.setFieldValue("obj", { v: e.target.value })}
				value={formik.values.obj.v}
			/>
			<button type="submit">Save</button>
		</form>
	);
};
