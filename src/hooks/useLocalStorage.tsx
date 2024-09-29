import { useState } from "react";

export function useLocalStorage(key: string, defaultValue: string | []) {
	function getJSONFromLocalStorage() {
		if (localStorage[key]) {
			return JSON.parse(localStorage[key]);
		} else {
			return defaultValue;
		}
	}

	const [data, setData] = useState(() => getJSONFromLocalStorage());

	function setJSONToLocalStorage(newData: string | [] | Function) {
		const valueToStore =
			typeof newData === "function" ? newData(data) : newData;

		setData(valueToStore);
		localStorage[key] = JSON.stringify(valueToStore);
	}

	return [data, setJSONToLocalStorage];
}
