import { getColorShadow } from "./getColorShadow";
import parseJSX from "html-react-parser";
import motdParser from "@sfirew/minecraft-motd-parser";
import { getColorFromStyle } from "./getColorFromStyle";
import { addObfuscatedStyle } from "./addObfuscatedStyle";

export function prepareServerData(response: ServerResponse | null) {
	let motd;
	let serverLogo: string | undefined | null;
	let onlinePlayers;
	let maxPlayers;
	let ping = null;
	let protocol = null;
	let versionName = null;
	let playerCountTooltip;
	let pingTooltip;
	let extra;

	if (response) {
		if (response.online) {
			const htmlMotd = motdParser.autoToHTML(response.motd.raw);
			motd = parseJSX("<p>" + htmlMotd + "</p>", {
				replace: ({ attribs }: any) => {
					addObfuscatedStyle(attribs);
				},
			});

			onlinePlayers = response.players.online;
			maxPlayers = response.players.max;
			ping = response.ping;
			protocol = response.version.protocol;
			versionName = response.version.raw;
			serverLogo = response.icon;

			if (response.info.raw.length > 0) {
				playerCountTooltip = response.info.raw.map((item) => {
					let textWithoutColorCodes = item.name.replace(/§./g, "");
					if (textWithoutColorCodes === "") item.name = " ";

					return parseJSX(motdParser.autoToHTML(item.name), {
						replace: ({ attribs }: any) => {
							if (attribs?.style) {
								const color = getColorFromStyle(attribs.style);

								if (color) {
									const darkerColor = getColorShadow(color);
									attribs.style = `${attribs.style} text-shadow: var(--text-shadow) var(--text-shadow) ${darkerColor};`;
								}

								addObfuscatedStyle(attribs);
							}

							return attribs;
						},
					});
				});

				if (onlinePlayers > playerCountTooltip.length) {
					playerCountTooltip.push(
						`... and ${onlinePlayers - playerCountTooltip.length} more ...`
					);
				}
			}
		} else {
			motd = null;
			pingTooltip = ["(no connection)"];
			ping = -1;
		}
	}

	if (
		protocol != null &&
		(protocol < 47 || protocol > 998) &&
		versionName != null
	) {
		ping = -1;
		extra = parseJSX(motdParser.autoToHTML(versionName), {
			replace: ({ attribs }: any) => {
				addObfuscatedStyle(attribs);
			},
		});
	}

	if (!pingTooltip) {
		if (ping === null) {
			pingTooltip = ["Pinging..."];
		} else if (ping === -1) {
			pingTooltip = ["Incompatible version!"];
		} else {
			pingTooltip = [ping + " ms"];
		}
	}

	return {
		serverLogo,
		motd,
		playerCountTooltip,
		pingTooltip,
		ping,
		onlinePlayers,
		maxPlayers,
		extra,
	};
}
