const SPIN_DIR = -1;

// Read by the renderer: eased mouse position (-1..1) and spin added by dragging.
// The renderer writes back the planet's radius in px, to turn drag distance into rotation.
export const pointer = {
	mx: 0,
	my: 0,
	spinOffset: 0,
	radius: 200,
};

let tmx = 0,
	tmy = 0,
	spinVel = 0;
let drag: {
	x: number;
	x0: number;
	y0: number;
	t: number;
	moved: boolean;
} | null = null;

// onTap gets the y position (px) of a press that didn't turn into a drag
export function bindInput(onTap: (y: number) => void) {
	addEventListener('pointermove', (e) => {
		if (e.pointerType === 'mouse') {
			tmx = (e.clientX / innerWidth) * 2 - 1;
			tmy = (e.clientY / innerHeight) * 2 - 1;
		}
		if (!drag) return;
		const now = performance.now();
		const d = (SPIN_DIR * (e.clientX - drag.x)) / pointer.radius;
		pointer.spinOffset += d;
		spinVel = (d / Math.max(8, now - drag.t)) * 1000;
		if (Math.abs(e.clientX - drag.x0) + Math.abs(e.clientY - drag.y0) > 10)
			drag.moved = true;
		drag.x = e.clientX;
		drag.t = now;
	});
	addEventListener('pointerdown', (e) => {
		if (e.target instanceof Element && e.target.closest('a')) return;
		drag = {
			x: e.clientX,
			x0: e.clientX,
			y0: e.clientY,
			t: performance.now(),
			moved: false,
		};
		spinVel = 0;
	});
	const endDrag = (e: PointerEvent) => {
		if (!drag) return;
		if (!drag.moved && e.type === 'pointerup') onTap(e.clientY);
		if (performance.now() - drag.t > 80) spinVel = 0; // held still before release: no fling
		drag = null;
	};
	addEventListener('pointerup', endDrag);
	addEventListener('pointercancel', endDrag);
}

// Once per frame: let a fling coast to a stop and ease toward the mouse
export function stepInput() {
	if (!drag) {
		pointer.spinOffset += spinVel / 30;
		spinVel *= 0.94;
	}
	pointer.mx += (tmx - pointer.mx) * 0.05;
	pointer.my += (tmy - pointer.my) * 0.05;
}
