import moment, { Moment } from "moment";

const invalidDate: Date = new Date(NaN);

export function addDays(date: Date, days: number): Date {
	const dateCopy = new Date(date.getTime());

	return new Date(dateCopy.setDate(dateCopy.getDate() + days));
}

export function getDateOnly(date: Date): Date {
	const month = date.getMonth();
	const day = date.getDate();
	const year = date.getFullYear();

	return new Date(year, month, day);
}

export function getYearAbbr(year: number) {
	return `'${year.toString().slice(-2)}`;
}

export const monthsAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;
export const weekDaysAbbr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
export const dateFormat = "MM/DD/YYYY";
export const dateBoundaries = {
	min: new Date(1900, 1, 1),
	max: new Date(2100, 12, 31),
};

export function formatDate(date: Date): string {
	return moment(date).format(dateFormat);
}

export function parseDate(value: string): Date {
	if (value === null || value === undefined) {
		return invalidDate;
	}

	const momentDate = moment(value, dateFormat, true);
	if (momentDate === null || momentDate === undefined || momentDate.isValid() === false) {
		return invalidDate;
	}

	return momentToDate(momentDate);
}

function momentToDate(momentDate?: Moment): Date {
	if (momentDate === null || momentDate === undefined) {
		return invalidDate;
	}

	return new Date(
		momentDate.year(),
		momentDate.month(),
		momentDate.date(),
		momentDate.hours(),
		momentDate.minutes(),
		momentDate.seconds(),
		momentDate.milliseconds()
	);
}
