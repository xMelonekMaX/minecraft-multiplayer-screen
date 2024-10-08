import { expect, test } from "vitest";
import { prepareServerData } from "../../src/utils/prepareServerData";

export const RESPONSE = JSON.parse(`{
	"ip": "cubehard.net",
	"online": true,
	"icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA",
	"motd": {
		"raw": {
			"extra": [
				{ "bold": true, "color": "dark_green", "text": "CUBE" },
				{ "color": "dark_gray", "text": "┌ " },
				{ "bold": true, "color": "green", "text": "ɪɴɴᴏᴡᴀᴄʏᴊɴʏ ꜱᴇʀᴡᴇʀ " },
				{ "bold": true, "color": "dark_gray", "text": "[" },
				{ "color": "green", "text": "1.21" },
				{ "bold": true, "color": "dark_gray", "text": "]\\n" },
				{ "bold": true, "color": "dark_green", "text": "HARD" },
				{ "color": "dark_gray", "text": "└ " },
				{ "color": "dark_red", "text": "BETA-TESTY " },
				{ "color": "gray", "text": "- " },
				{ "color": "red", "text": "od Soboty 19:00" }
			],
			"text": ""
		}
	},
	"info": {
		"raw": [
			{
				"name": "§2§lCUBEHARD§7.net"
			},
			{ "name": "" },
			{
				"name": "§8» §7Strona§8: §acubehard.net"
			},
			{
				"name": "§8» §7Teamspeak§8: §ats.cubehard.net"
			},
			{
				"name": "§8» §7Discord§8: §adc.cubehard.net"
			},
			{
				"name": "§8» §7YouTube§8: §ayt.cubehard.net"
			},
			{
				"name": "§8» §7TikTok§8: §atiktok.cubehard.net"
			}
		]
	},
	"players": {
		"max": 2,
		"online": 1
	},
	"version": {
		"protocol": 764,
		"raw": "CUBEHARD.net 1.21.1"
	},
	"ping": 2
}`);

test("prepares data of connected server", () => {
	const serverData = prepareServerData(RESPONSE);

	expect(serverData.serverLogo).toBe(RESPONSE.icon);
	expect(serverData.maxPlayers).toBe(RESPONSE.players.max);
	expect(serverData.onlinePlayers).toBe(RESPONSE.players.online);
	expect(serverData.ping).toBe(RESPONSE.ping);
	expect(serverData.playerCountTooltip?.length).toBe(7);
	expect(serverData.extra).toBe(undefined);
	expect(serverData.pingTooltip).toEqual(["2 ms"]);
});

test("prepares data of pinging server", () => {
	const serverData = prepareServerData(null);

	expect(serverData.serverLogo).toBe(undefined);
	expect(serverData.maxPlayers).toBe(undefined);
	expect(serverData.onlinePlayers).toBe(undefined);
	expect(serverData.ping).toBe(null);
	expect(serverData.playerCountTooltip).toBe(undefined);
	expect(serverData.extra).toBe(undefined);
	expect(serverData.pingTooltip).toEqual(["Pinging..."]);
});

test("prepares data of unconnected server", () => {
	RESPONSE.online = false;
	const serverData = prepareServerData(RESPONSE);

	expect(serverData.serverLogo).toBe(undefined);
	expect(serverData.maxPlayers).toBe(undefined);
	expect(serverData.onlinePlayers).toBe(undefined);
	expect(serverData.ping).toBe(-1);
	expect(serverData.playerCountTooltip).toBe(undefined);
	expect(serverData.extra).toBe(undefined);
	expect(serverData.pingTooltip).toEqual(["(no connection)"]);
	expect(serverData.motd).toBe(null);
});
