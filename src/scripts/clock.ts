import { phaseOf, readParisTime } from './time';

export function startClock(el: HTMLElement) {
	function tick() {
		const { hour, minute, hours } = readParisTime();
		const hh = String(hour).padStart(2, '0'),
			mm = String(minute).padStart(2, '0');
		el.textContent = `paris ${hh}:${mm} · ${phaseOf(hours)} on planet34`;
	}
	tick();
	setInterval(tick, 1000);
}
