import CalendarDate from "../Calendar/CalendarDate";

export class MaybeDailyScore {
	constructor(public date?: CalendarDate, public value?: number) {}

	public isDailyScore = () => {
		return this.date && this.value;
	};

	public toDailyScore = () => {
		if (!this.isDailyScore()) {
			throw new Error("Date or Value is undefined");
		}

		return new DailyScore(this.date as CalendarDate, this.value as number);
	};
}

export default class DailyScore {
	constructor(public date: CalendarDate, public value: number) {}
}
