import { grid } from './grid';

let comet: {
	x: number;
	y: number;
	vx: number;
	vy: number;
	last: number;
} | null = null;
let nextComet =
	performance.now() + (innerWidth < 700 ? 2500 : 8000 + Math.random() * 12000);

function spawnComet(now: number, atRow?: number) {
	const { cols, rows, cw, ch } = grid;
	const ltr = Math.random() < 0.5;
	const speed = ((30 + Math.random() * 25) * 7.8) / cw; // same on-screen speed at any glyph size
	const ang = (0.1 + Math.random() * 0.25) * (Math.random() < 0.5 ? 1 : -1);
	comet = {
		x: ltr ? -4 : cols + 4,
		y: atRow != null ? atRow : rows * (0.1 + Math.random() * 0.6),
		vx: (ltr ? 1 : -1) * speed * Math.cos(ang),
		vy: speed * Math.sin(ang) * (cw / ch),
		last: now,
	};
}

// Send a comet across the given row, unless one is already flying
export function summonComet(row: number) {
	if (!comet) spawnComet(performance.now(), row);
}

export function drawComet(now: number) {
	if (!comet && now > nextComet) spawnComet(now);
	if (!comet) return;
	const { cols, rows, cw, cells } = grid;
	const dt = (now - comet.last) / 1000;
	comet.last = now;
	comet.x += comet.vx * dt;
	comet.y += comet.vy * dt;
	const l = Math.hypot(comet.vx, comet.vy);
	const dx = comet.vx / l,
		dy = comet.vy / l;
	const K = Math.round((16 * 7.8) / cw);
	for (let k = K; k >= 0; k--) {
		const c = Math.round(comet.x - dx * k),
			r = Math.round(comet.y - dy * k);
		if (r < 0 || r >= rows || c < 0 || c >= cols) continue;
		const f = k / K;
		cells[r][c] = k === 0 ? '*' : f < 0.25 ? '+' : f < 0.56 ? ':' : '.';
	}
	if (
		comet.x < -K - 8 ||
		comet.x > cols + K + 8 ||
		comet.y < -K - 8 ||
		comet.y > rows + K + 8
	) {
		comet = null;
		nextComet = now + 40000 + Math.random() * 50000;
	}
}
