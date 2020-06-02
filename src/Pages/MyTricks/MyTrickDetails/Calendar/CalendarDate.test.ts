import CalendarDate from "./CalendarDate";

describe("CalendarDate", () => {
	describe("equals", () => {
		it("is true, when year, month and date are equal", () => {
			const date1 = new CalendarDate(2020, 11, 1);
			const date2 = new CalendarDate(2020, 11, 1);

			const result = date1.equals(date2);

			expect(result).toBe(true);
		});

		const notEqualTestCases = [
			{ date1: new CalendarDate(2019, 11, 1), date2: new CalendarDate(2020, 11, 1) },
			{ date1: new CalendarDate(2020, 10, 1), date2: new CalendarDate(2020, 11, 1) },
			{ date1: new CalendarDate(2020, 11, 2), date2: new CalendarDate(2020, 11, 1) },
		];

		it.each(notEqualTestCases)("is false, when year, month or date are not equal - %o", (testCase) => {
			const { date1, date2 } = testCase;
			const result = date1.equals(date2);
			expect(result).toBe(false);
		});
	});

	describe("addDays", () => {
		it("is immutable", () => {
			const date = new CalendarDate(2020, 11, 1);
			date.addDays(1);

			const dateIsUnchanged = date.equals(date);

			expect(dateIsUnchanged).toBe(true);
		});

		const addDaysTestCases = [
			{ initialDate: new CalendarDate(2020, 11, 31), daysToAdd: 1, expectedResult: new CalendarDate(2021, 0, 1) },
			{
				initialDate: new CalendarDate(2020, 11, 31),
				daysToAdd: 366,
				expectedResult: new CalendarDate(2022, 0, 1),
			},
			{
				initialDate: new CalendarDate(2020, 10, 1),
				daysToAdd: -1,
				expectedResult: new CalendarDate(2020, 9, 31),
			},
		];
		it.each(addDaysTestCases)("correctly adds and removes days", ({ initialDate, daysToAdd, expectedResult }) => {
			const result = initialDate.addDays(daysToAdd);

			const areEqual = result.equals(expectedResult);

			expect(areEqual).toBe(true);
		});
	});

	describe("getDayOfWeek", () => {
		const getDayOfWeekTestCases = [
			{ date: new CalendarDate(2020, 5, 1), expectedResult: 1 },
			{ date: new CalendarDate(2020, 5, 2), expectedResult: 2 },
			{ date: new CalendarDate(2020, 5, 3), expectedResult: 3 },
			{ date: new CalendarDate(2020, 5, 4), expectedResult: 4 },
			{ date: new CalendarDate(2020, 5, 5), expectedResult: 5 },
			{ date: new CalendarDate(2020, 5, 6), expectedResult: 6 },
			{ date: new CalendarDate(2020, 5, 7), expectedResult: 0 },
		];

		it.each(getDayOfWeekTestCases)("returns correct day of week", ({ date, expectedResult }) => {
			const result = date.getDayOfWeek();

			expect(result).toBe(expectedResult);
		});
	});

	describe("getTimeSinceUnixEpoch", () => {
		it("returns the same value as native Date", () => {
			const date = new CalendarDate(2020, 5, 1);
			const expectedResult = new Date(2020, 5, 1).getTime();

			const result = date.getTimeSinceUnixEpoch();

			expect(result).toBe(expectedResult);
		});
	});

	describe("compare", () => {
		it("returns 1 if greater than other", () => {
			const date1 = new CalendarDate(2020, 5, 1);
			const date2 = new CalendarDate(2020, 4, 31);

			const result = date1.compare(date2);

			expect(result).toBe(1);
		});

		it("returns -1 if smaller than other", () => {
			const date1 = new CalendarDate(2020, 4, 31);
			const date2 = new CalendarDate(2020, 5, 1);

			const result = date1.compare(date2);

			expect(result).toBe(-1);
		});

		it("returns 0 if equal to other", () => {
			const date1 = new CalendarDate(2020, 5, 1);
			const date2 = new CalendarDate(2020, 5, 1);

			const result = date1.compare(date2);

			expect(result).toBe(0);
		});
	});

	describe("getDate", () => {
		it("returns correct date without time", () => {
			const date = new CalendarDate(2020, 5, 1).getDate();
			const jsDate = new Date(2020, 5, 1);

			expect(date.getTime()).toBe(jsDate.getTime());

			expect(date.getHours()).toBe(0);
			expect(date.getMinutes()).toBe(0);
			expect(date.getSeconds()).toBe(0);
			expect(date.getMilliseconds()).toBe(0);
		});
	});

	describe("today", () => {
		it("returns same date as native Date without time", () => {
			const jsDate = new Date();
			const jsDateWithoutTime = new Date(jsDate.getFullYear(), jsDate.getMonth(), jsDate.getDate());

			const result = CalendarDate.today();

			expect(result.getDate().getTime()).toBe(jsDateWithoutTime.getTime());
		});
	});

	describe("fromDate", () => {
		it("correctly creates a new instance", () => {
			const jsDate = new Date(2020, 5, 1, 12, 20, 35);
			const fromConstructor = new CalendarDate(2020, 5, 1);

			const result = CalendarDate.fromDate(jsDate);

			expect(result.year).toBe(fromConstructor.year);
			expect(result.month).toBe(fromConstructor.month);
			expect(result.day).toBe(fromConstructor.day);
		});
	});
});
