import { readParisTime } from '../time';
import { drawComet, summonComet } from './comet';
import { grid, measure } from './grid';
import { bindInput, pointer, stepInput } from './input';
import { cross, idx, norm } from './math';
import { fbm, hash3 } from './noise';

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Character ramps, dark → bright
const LAND = ' .:-=+*#%@';
const OCEAN = ' .,-~~=';
const RING = ' .-:=+';

// Planet spin axis (also the ring's normal), tilted toward the viewer
const A = norm([-0.32, 0.9, 0.3]);
const U = norm([A[1], -A[0], 0]);
const V = cross(U, A);

function render(pre: HTMLElement, now: number) {
	const { cols, rows, cw, ch, cells } = grid;
	const t = now / 1000;
	stepInput();
	const spin = (reduce ? 0.6 : t * 0.07) + pointer.spinOffset;
	const cs = Math.cos(spin),
		sn = Math.sin(spin);

	// full turn per day: lit face at noon, backlit eclipse with city lights at midnight
	const { hours } = readParisTime();
	const th = ((hours - 12) / 24) * Math.PI * 2 + 0.5 + pointer.mx * 0.8;
	const L = norm([Math.sin(th), 0.28 - pointer.my * 0.35, Math.cos(th)]);

	const W = innerWidth,
		H = innerHeight;
	const narrow = W < 700;
	// Phones: planet fills ~75% of the width; the ring is allowed to run off the edges
	const cx = W / 2,
		cy = narrow ? H * 0.38 : H * 0.47;
	const Rp = narrow ? Math.min(W * 0.37, H * 0.26) : Math.min(W, H) * 0.22;
	pointer.radius = Rp;
	const ringLight =
		0.35 + 0.45 * Math.abs(A[0] * L[0] + A[1] * L[1] + A[2] * L[2]);
	const starT = Math.floor(t * 0.7);

	for (let r = 0; r < rows; r++) {
		const row = cells[r];
		const y = -((r + 0.5) * ch - cy) / Rp;
		for (let c = 0; c < cols; c++) {
			const x = ((c + 0.5) * cw - cx) / Rp;
			const d = x * x + y * y;
			let chr = null;

			if (d < 4.6) {
				// Ring: intersect a view ray with the plane perpendicular to A
				const tz = -(A[0] * x + A[1] * y) / A[2];
				const rr2 = d + tz * tz;
				if (rr2 > 1.8225 && rr2 < 4.41 && (d >= 1 || tz > Math.sqrt(1 - d))) {
					const rr = Math.sqrt(rr2);
					if (rr < 1.72 || rr > 1.78) {
						let dens = 0.55 + 0.45 * Math.sin(rr * 31) * Math.cos(rr * 9.7);
						dens *= Math.min(1, (rr - 1.35) * 6, (2.1 - rr) * 6);
						const dl = x * L[0] + y * L[1] + tz * L[2];
						const shadowed = dl < 0 && rr2 - dl * dl < 1;
						const ch_ =
							RING[idx(RING, dens * ringLight * 1.25 * (shadowed ? 0.08 : 1))];
						if (ch_ !== ' ') chr = ch_;
					}
				}

				if (chr === null && d < 1) {
					// Planet surface
					const z = Math.sqrt(1 - d);
					const ndl = x * L[0] + y * L[1] + z * L[2];
					const lx = x * U[0] + y * U[1] + z * U[2];
					const ly = x * A[0] + y * A[1] + z * A[2];
					const lz = x * V[0] + y * V[1] + z * V[2];
					const sx = lx * cs - lz * sn,
						sz = lx * sn + lz * cs;
					const hgt = fbm(sx * 1.7 + 11.3, ly * 1.7 + 3.1, sz * 1.7 + 7.7);
					const b = Math.max(0, ndl);
					const limb = 0.75 + 0.25 * z;

					if (Math.abs(ly) > 0.84 - (hgt - 0.5) * 0.4) {
						chr = LAND[idx(LAND, 0.12 + b * 0.95)]; // ice caps
					} else if (hgt > 0.53) {
						if (b < 0.04) {
							// city lights on the night side
							const cl = hash3(
								Math.floor(sx * 38),
								Math.floor(ly * 38),
								Math.floor(sz * 38),
							);
							chr = cl > 0.95 ? (cl > 0.985 ? '*' : '+') : '.'; // faint earthshine on land
						} else {
							chr =
								LAND[idx(LAND, 0.11 + b * limb * (0.75 + (hgt - 0.53) * 1.5))];
						}
					} else {
						const Rz = 2 * ndl * z - L[2]; // sun glint on the ocean
						chr =
							b > 0.2 && Rz > 0.965
								? Rz > 0.99
									? '*'
									: 'o'
								: OCEAN[idx(OCEAN, b * limb * 0.85)];
					}
				} else if (chr === null && d < 1.15) {
					// Atmosphere rim
					const hb = (x * L[0] + y * L[1]) / Math.sqrt(d);
					if (hb > 0.25) chr = d < 1.06 ? ':' : '.';
				}
			}

			if (chr === null) {
				// Background stars
				const hs = hash3(c, r, 91);
				if (hs > 0.993) {
					chr = hash3(c, r, starT) > 0.85 ? ' ' : hs > 0.998 ? '+' : '.';
				} else chr = ' ';
			}
			row[c] = chr;
		}
	}

	if (!reduce) drawComet(now);

	let out = '';
	for (let r = 0; r < rows; r++) out += cells[r].join('') + '\n';
	pre.textContent = out;
}

export function startSky(pre: HTMLElement) {
	measure(pre);
	addEventListener('resize', () => measure(pre));
	bindInput((y) => summonComet(y / grid.ch));

	let last = 0;
	function loop(now: number) {
		requestAnimationFrame(loop);
		if (now - last < (reduce ? 2000 : 33)) return;
		last = now;
		render(pre, now);
	}
	requestAnimationFrame(loop);
}
