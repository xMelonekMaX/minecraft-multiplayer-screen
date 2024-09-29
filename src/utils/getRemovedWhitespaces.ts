export function getRemovedWhitespaces(rawMotd: RawMotd) {
	let whitespacesRemovedByAPI = "";

	if (!rawMotd.extra) return whitespacesRemovedByAPI;

	if (rawMotd.extra.length > 0) {
		let text = "";
		if (typeof rawMotd.extra[0] === "object" && rawMotd.extra[0].text) {
			text = rawMotd.extra[0].text;
		} else if (typeof rawMotd.extra[0] === "string") {
			text = rawMotd.extra[0];
		}

		if (text.length > 0 && /^\s+$/.test(text)) {
			whitespacesRemovedByAPI = text.slice(0, -1);
		}
	}

	return whitespacesRemovedByAPI;
}
