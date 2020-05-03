import CalendarDate from "../../MyTricks/MyTrickDetails/Calendar/CalendarDate";
import PracticeDate from "../../MyTricks/MyTrickDetails/Score/DailyScore";

export type LibraryTrick = {
	id: number;
	name: string;
	videoUrl: string;
};

export type UserLibraryTrick = LibraryTrick & { addedToMyTricks: boolean };
export type MyTrickJSON = LibraryTrick & {
	practiceDates: { date: { year: number; month: number; day: number }; score?: number }[];
};
export type MyTrick = LibraryTrick & { practiceDates: PracticeDate[] };
