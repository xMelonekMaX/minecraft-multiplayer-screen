import { act, renderHook } from "@testing-library/react";
import { expect, test } from "vitest";
import { useLocalStorage } from "../../src/hooks/useLocalStorage";

test("returns the initial value", () => {
	const key = "test_key";
	const expectedValue = "test_value";

	const { result } = renderHook(() => useLocalStorage(key, expectedValue));

	expect(result.current[0]).toBe(expectedValue);
});

test("updates data properly", () => {
	const key = "test_key";
	const expectedValue = "new_value";

	const { result } = renderHook(() => useLocalStorage(key, "original_value"));
	const setJSONToLocalStorage = result.current[1];

	act(() => {
		setJSONToLocalStorage(expectedValue);
	});

	expect(result.current[0]).toBe(expectedValue);
	expect(JSON.parse(localStorage.getItem(key)!)).toEqual(expectedValue);
});
