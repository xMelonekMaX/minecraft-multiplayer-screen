export function preventWhitespaceCollapse(text: string) {
	return text.replace(/\s{2,}/g, (match) => " ".repeat(match.length));
}
