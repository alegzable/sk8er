import CalendarDate from "../../MyTricks/MyTrickDetails/Calendar/CalendarDate";

export type LibraryTrick = {
	id: string;
	name: string;
	videoUrl: string;
};

export type UserTrick = {
	id: string;
	libraryTrickId: string;
};

export type UserTrickPracticeDay = {
	id: string;
	userTrickId: string;
	date: CalendarDate;
	score?: number;
};

export type UserTrickPracticeDayJSON = {
	id: string;
	userTrickId: string;
	date: { year: number; month: number; day: number };
	score?: number;
};
