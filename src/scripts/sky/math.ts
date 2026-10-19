export type Vec3 = [number, number, number];

export const norm = (v: Vec3): Vec3 => {
	const l = Math.hypot(v[0], v[1], v[2]);
	return [v[0] / l, v[1] / l, v[2] / l];
};

export const cross = (a: Vec3, b: Vec3): Vec3 => [
	a[1] * b[2] - a[2] * b[1],
	a[2] * b[0] - a[0] * b[2],
	a[0] * b[1] - a[1] * b[0],
];

// Index into a character ramp for a brightness v in 0..1
export const idx = (ramp: string, v: number) =>
	Math.min(ramp.length - 1, Math.max(0, Math.floor(v * ramp.length)));
