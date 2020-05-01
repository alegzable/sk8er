import CalendarDate from "../../MyTricks/MyTrickDetails/Calendar/CalendarDate";
import DailyScore from "../../MyTricks/MyTrickDetails/Score/DailyScore";

export type LibraryTrick = {
	id: number;
	name: string;
	videoUrl: string;
};

export type UserLibraryTrick = LibraryTrick & { addedToMyTricks: boolean };
export type MyTrickJSON = LibraryTrick & { practiceDates: { year: number; month: number; day: number }[] };
export type MyTrick = LibraryTrick & { practiceDates: CalendarDate[] };
export type MyTrickScoresJSON = {
	id: number;
	scores: { date: { year: number; month: number; day: number }; value: number }[];
};
export type MyTrickScores = { id: number; scores: DailyScore[] };
