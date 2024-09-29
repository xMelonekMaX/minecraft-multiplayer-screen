const obfuscatedCharacterList: string[] = [
	"'",
	",",
	".",
	";",
	"i",
	"l",
	"!",
	":",
	"|",
	"˙",
];

export function obfuscateCharacters(text: string) {
	let replacedText = "";

	for (const char of text) {
		if (char === " " || char === " ") {
			replacedText += " ";
		} else {
			const randomIndex = Math.floor(
				Math.random() * obfuscatedCharacterList.length
			);
			replacedText += obfuscatedCharacterList[randomIndex];
		}
	}

	return replacedText;
}
