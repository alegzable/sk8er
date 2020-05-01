import CalendarDate from "../Calendar/CalendarDate";

export class MaybeDailyScore {
	constructor(public date?: CalendarDate, public score?: number) {}
}

export default class DailyScore {
	constructor(public date: CalendarDate, public score: number) {}
}
