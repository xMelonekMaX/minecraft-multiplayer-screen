import { test, expect } from "vitest";
import { addObfuscatedStyle } from "../../src/utils/addObfuscatedStyle";
import { OBFUSCATED_CLASS_NAME } from "../../src/constants";

type AttribsType = { style: string; class?: string };

test("adds class to object with 'obfuscated' style", () => {
	const attribsWithObfuscated: AttribsType = {
		style: "color:#ffffff;obfuscated;",
	};
	addObfuscatedStyle(attribsWithObfuscated);
	expect(attribsWithObfuscated.class).toEqual(OBFUSCATED_CLASS_NAME);
});

test("adds class to object with 'mc_obfuscated' style", () => {
	const attribsWithMcObfuscated: AttribsType = {
		style: "color:#fff000;mc_obfuscated;",
	};
	addObfuscatedStyle(attribsWithMcObfuscated);
	expect(attribsWithMcObfuscated.class).toEqual(OBFUSCATED_CLASS_NAME);
});
