// The character grid the sky is drawn into: size in glyphs (cols × rows),
// glyph size in px (cw × ch), and one character per cell
export const grid = {
	cols: 0,
	rows: 0,
	cw: 8,
	ch: 14,
	cells: [] as string[][],
};

export function measure(pre: HTMLElement) {
	const s = document.createElement('span');
	s.textContent = 'M'.repeat(100);
	s.style.cssText = 'position:absolute;visibility:hidden;white-space:pre';
	pre.appendChild(s);
	grid.cw = s.getBoundingClientRect().width / 100;
	s.remove();
	grid.ch = parseFloat(getComputedStyle(pre).lineHeight);
	grid.cols = Math.ceil(innerWidth / grid.cw);
	grid.rows = Math.ceil(innerHeight / grid.ch);
	grid.cells = Array.from({ length: grid.rows }, () =>
		new Array(grid.cols).fill(' '),
	);
}
