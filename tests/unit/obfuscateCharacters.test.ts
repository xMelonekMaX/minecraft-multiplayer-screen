import { expect, test } from "vitest";
import {
	obfuscateCharacters,
	obfuscatedCharacterList,
} from "../../src/utils/obfuscateCharacters";

test("obfuscates text properly", () => {
	const obfuscatedText = obfuscateCharacters("obfuscated text");
	expect(obfuscatedText.at(10)).toEqual(" ");
	expect(obfuscatedCharacterList.includes(obfuscatedText[0])).toBe(true);
	expect(obfuscatedCharacterList.includes(obfuscatedText[6])).toBe(true);
});
