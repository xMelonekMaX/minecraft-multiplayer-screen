import { OBFUSCATED_CLASS_NAME } from "../constants";

export function addObfuscatedStyle(attribs: any) {
	if (attribs?.style) {
		if (
			attribs.style.includes("mc_obfuscated;") ||
			attribs.style.includes("obfuscated;")
		) {
			attribs.style = attribs.style.replace("mc_obfuscated;", "");
			attribs.style = attribs.style.replace("obfuscated;", "");
			attribs.class = OBFUSCATED_CLASS_NAME;
		}
	}
}
