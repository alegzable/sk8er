export function logElapsedTime(func: () => any) {
	const t1 = performance.now();

	func();

	const t2 = performance.now();

	console.log("Elapsed " + (t2 - t1).toFixed(2) + " milliseconds.");
}
