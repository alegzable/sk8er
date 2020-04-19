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
