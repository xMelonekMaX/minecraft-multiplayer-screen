import { expect, test } from "vitest";
import { getColorFromStyle } from "../../src/utils/getColorFromStyle";

test("gets color from style properly", () => {
	expect(getColorFromStyle("color:#34f465;mc_obfuscated;")).toEqual("#34f465");
	expect(getColorFromStyle("color:#ffffff;")).toEqual("#ffffff");
	expect(getColorFromStyle("color:#000000;obfuscated;")).toEqual("#000000");
	expect(getColorFromStyle("")).toEqual(null);
});
