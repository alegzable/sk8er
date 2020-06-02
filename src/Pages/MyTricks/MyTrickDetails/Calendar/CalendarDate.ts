import { addDays } from "../../../../Utils/dateUtils";

type CompareResult = 1 | 0 | -1;

export default class CalendarDate {
	constructor(public year: number, public month: number, public day: number) {}

	public equals = (other: CalendarDate): boolean => {
		return other.year === this.year && other.month === this.month && other.day === this.day;
	};

	public addDays = (days: number): CalendarDate => {
		const date = addDays(this.getDate(), days);

		return CalendarDate.fromDate(date);
	};

	public getDayOfWeek = (): number => {
		const date = this.getDate();

		return date.getDay();
	};

	public getTimeSinceUnixEpoch = (): number => {
		return this.getDate().getTime();
	};

	public compare = (other: CalendarDate): CompareResult => {
		const thisDate = this.getDate();
		const otherDate = other.getDate();

		if (thisDate > otherDate) {
			return 1;
		}

		if (thisDate < otherDate) {
			return -1;
		}

		return 0;
	};

	public getDate = () => {
		return new Date(this.year, this.month, this.day);
	};

	public static today(): CalendarDate {
		return CalendarDate.fromDate(new Date());
	}

	public static fromDate(date: Date): CalendarDate {
		return new CalendarDate(date.getFullYear(), date.getMonth(), date.getDate());
	}
}
