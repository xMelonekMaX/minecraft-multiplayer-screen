const DARKEN_PERCENTAGE = 0.75;

export function getColorShadow(color: string) {
	if (color.startsWith("#")) {
		let r = parseInt(color.slice(1, 3), 16);
		let g = parseInt(color.slice(3, 5), 16);
		let b = parseInt(color.slice(5, 7), 16);

		r = Math.floor(r * (1 - DARKEN_PERCENTAGE));
		g = Math.floor(g * (1 - DARKEN_PERCENTAGE));
		b = Math.floor(b * (1 - DARKEN_PERCENTAGE));

		// Konwersja z powrotem do HEX
		return `rgb(${r}, ${g}, ${b})`;
	}
	return color;
}
