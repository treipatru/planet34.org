const fmt = new Intl.DateTimeFormat('en-GB', {
	timeZone: 'Europe/Paris',
	hour: '2-digit',
	minute: '2-digit',
	second: '2-digit',
	hourCycle: 'h23',
});

// Current time in Paris; `hours` is the fractional hour of the day (0–24)
export function readParisTime() {
	const p = fmt.formatToParts(new Date());
	const g = (t: Intl.DateTimeFormatPartTypes) =>
		+p.find((x) => x.type === t)!.value;
	const hour = g('hour'),
		minute = g('minute');
	return { hour, minute, hours: hour + minute / 60 + g('second') / 3600 };
}

export function phaseOf(hours: number) {
	return hours < 5
		? 'night'
		: hours < 8
			? 'dawn'
			: hours < 18
				? 'day'
				: hours < 21.5
					? 'dusk'
					: 'night';
}
