import CalendarDate from "../../MyTricks/MyTrickDetails/Calendar/CalendarDate";

export type LibraryTrick = {
	id: number;
	name: string;
	videoUrl: string;
};

export type UserLibraryTrick = LibraryTrick & { addedToMyTricks: boolean };
export type MyTrickJSON = LibraryTrick & { practiceDates: { year: number; month: number; day: number }[] };
export type MyTrick = LibraryTrick & { practiceDates: CalendarDate[] };
