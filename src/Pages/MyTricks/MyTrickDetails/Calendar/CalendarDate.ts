import { addDays } from "../../../../Utils/dateUtils";

export default class CalendarDate {
	constructor(public year: number, public month: number, public day: number) {}

	public equals = (other: CalendarDate): boolean => {
		return other.year === this.year && other.month === this.month && other.day === this.day;
	};

	public addDays = (days: number): CalendarDate => {
		const date = addDays(this._getDate(), days);

		return CalendarDate.fromDate(date);
	};

	public getDayOfWeek = (): number => {
		const date = this._getDate();

		return date.getDay();
	};

	public getTimeSinceUnixEpoch = (): number => {
		return this._getDate().getTime();
	};

	public static today(): CalendarDate {
		return CalendarDate.fromDate(new Date());
	}

	public static fromDate(date: Date): CalendarDate {
		return new CalendarDate(date.getFullYear(), date.getMonth(), date.getDate());
	}

	private _getDate = () => {
		return new Date(this.year, this.month, this.day);
	};
}
