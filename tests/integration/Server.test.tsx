import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { ServersContext } from "../../src/contexts/ServersContext";
import {
	DEFAULT_SERVER_ICON,
	Server,
} from "../../src/components/Server/Server";

const targetServerIndex = 0;
const singleServerServerList = [
	{
		id: targetServerIndex,
		name: "Server A",
		ipAddress: "127.0.0.1",
		resourcePacksOption: 0,
		response: {
			online: false,
		},
		lastServerIcon: "data:image/png;base64,test_value",
	},
] as Server[];
const dualServerServerList = [
	{
		id: 0,
		name: "Server A",
		ipAddress: "hypixel.net",
		resourcePacksOption: 0,
	},
	{
		id: 1,
		name: "Server B",
		ipAddress: "ogulnie.ga",
		resourcePacksOption: 0,
	},
] as Server[];

test("shows proper message when server is offline", () => {
	render(
		<ServersContext value={[singleServerServerList, vi.fn()]}>
			<Server
				serverId={targetServerIndex}
				selected={true}
				onSelected={() => {}}
				onMoveUp={() => {}}
				onMoveDown={() => {}}
				serverToFocus={null}
				setServerToFocus={() => {}}
			/>
		</ServersContext>
	);

	const motd = screen.getByText("Can't connect to server");
	expect(motd).toBeInTheDocument();
});

test("shows last server icon when server is offline", () => {
	render(
		<ServersContext value={[singleServerServerList, vi.fn()]}>
			<Server
				serverId={targetServerIndex}
				selected={true}
				onSelected={() => {}}
				onMoveUp={() => {}}
				onMoveDown={() => {}}
				serverToFocus={null}
				setServerToFocus={() => {}}
			/>
		</ServersContext>
	);

	const lastServerIcon = screen.getByTestId("server-logo");
	expect(lastServerIcon).toHaveAttribute(
		"src",
		singleServerServerList[0].lastServerIcon
	);
});

test("shows default server icon when icon is missing", () => {
	singleServerServerList[0].lastServerIcon = null;

	render(
		<ServersContext value={[singleServerServerList, vi.fn()]}>
			<Server
				serverId={targetServerIndex}
				selected={true}
				onSelected={() => {}}
				onMoveUp={() => {}}
				onMoveDown={() => {}}
				serverToFocus={null}
				setServerToFocus={() => {}}
			/>
		</ServersContext>
	);

	const serverLogo = screen.getByTestId("server-logo");
	expect(serverLogo).toHaveAttribute("src", DEFAULT_SERVER_ICON);
});

test("hides position buttons when only one server is present", () => {
	render(
		<ServersContext value={[singleServerServerList, vi.fn()]}>
			<Server
				serverId={targetServerIndex}
				selected={true}
				onSelected={() => {}}
				onMoveUp={() => {}}
				onMoveDown={() => {}}
				serverToFocus={null}
				setServerToFocus={() => {}}
			/>
		</ServersContext>
	);

	const moveUpButton = screen.queryByTestId("move-up-button");
	const moveDownButton = screen.queryByTestId("move-down-button");
	expect(moveUpButton).toBeNull();
	expect(moveDownButton).toBeNull();
});

test("hides move up button when it's the first server", () => {
	render(
		<ServersContext value={[dualServerServerList, vi.fn()]}>
			<Server
				serverId={0}
				selected={true}
				onSelected={() => {}}
				onMoveUp={() => {}}
				onMoveDown={() => {}}
				serverToFocus={null}
				setServerToFocus={() => {}}
			/>
		</ServersContext>
	);

	const moveUpButton = screen.queryByTestId("move-up-button");
	const moveDownButton = screen.queryByTestId("move-down-button");
	expect(moveUpButton).toBeNull();
	expect(moveDownButton).toBeInTheDocument();
});

test("hides move down button when it's the last server", () => {
	render(
		<ServersContext value={[dualServerServerList, vi.fn()]}>
			<Server
				serverId={1}
				selected={true}
				onSelected={() => {}}
				onMoveUp={() => {}}
				onMoveDown={() => {}}
				serverToFocus={null}
				setServerToFocus={() => {}}
			/>
		</ServersContext>
	);

	const moveUpButton = screen.queryByTestId("move-up-button");
	const moveDownButton = screen.queryByTestId("move-down-button");
	expect(moveUpButton).toBeInTheDocument();
	expect(moveDownButton).toBeNull();
});
