export function hash3(i: number, j: number, k: number) {
	let h =
		Math.imul(i | 0, 374761393) ^
		Math.imul(j | 0, 668265263) ^
		Math.imul(k | 0, 1274126177);
	h = Math.imul(h ^ (h >>> 13), 1274126177);
	h ^= h >>> 16;
	return (h >>> 0) / 4294967296;
}

export function noise3(x: number, y: number, z: number) {
	const xi = Math.floor(x),
		yi = Math.floor(y),
		zi = Math.floor(z);
	const xf = x - xi,
		yf = y - yi,
		zf = z - zi;
	const u = xf * xf * (3 - 2 * xf),
		v = yf * yf * (3 - 2 * yf),
		w = zf * zf * (3 - 2 * zf);
	const a = hash3(xi, yi, zi),
		b = hash3(xi + 1, yi, zi);
	const c = hash3(xi, yi + 1, zi),
		d = hash3(xi + 1, yi + 1, zi);
	const e = hash3(xi, yi, zi + 1),
		f = hash3(xi + 1, yi, zi + 1);
	const g = hash3(xi, yi + 1, zi + 1),
		h = hash3(xi + 1, yi + 1, zi + 1);
	const x1 = a + (b - a) * u,
		x2 = c + (d - c) * u,
		x3 = e + (f - e) * u,
		x4 = g + (h - g) * u;
	const y1 = x1 + (x2 - x1) * v,
		y2 = x3 + (x4 - x3) * v;
	return y1 + (y2 - y1) * w;
}

export function fbm(x: number, y: number, z: number) {
	let s = 0,
		a = 0.5;
	for (let o = 0; o < 4; o++) {
		s += a * noise3(x, y, z);
		x *= 2.03;
		y *= 2.03;
		z *= 2.03;
		a *= 0.5;
	}
	return s / 0.9375;
}
