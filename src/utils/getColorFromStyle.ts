export function getColorFromStyle(style: string) {
	const colorRegex =
		/color:\s*(#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}|rgb\([^)]+\));?/i;
	const hasColor = style.match(colorRegex);

	if (hasColor) {
		return hasColor[1];
	}
	return null;
}
