import { expect, test } from "vitest";
import { getColorShadow } from "../../src/utils/getColorShadow";

test("reduces color brightness by 75%", () => {
	expect(getColorShadow("#ffffff")).toEqual("rgb(63, 63, 63)");
	expect(getColorShadow("#000000")).toEqual("rgb(0, 0, 0)");
});
