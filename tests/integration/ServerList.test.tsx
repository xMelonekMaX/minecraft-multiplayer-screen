import { fireEvent, render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { ServerList } from "../../src/components/ServerList/ServerList";
import { ServersContext } from "../../src/contexts/ServersContext";
import { SelectedServerContext } from "../../src/contexts/SelectedServerContext";

const serverList = [
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
		resourcePacksOption: 1,
	},
] as Server[];

Element.prototype.scrollIntoView = vi.fn();

test("select first server when arrow up is pressed", () => {
	const setSelectedServerIndexMock = vi.fn();

	render(
		<ServersContext value={[serverList, vi.fn()]}>
			<SelectedServerContext value={[null, setSelectedServerIndexMock]}>
				<ServerList />
			</SelectedServerContext>
		</ServersContext>
	);

	fireEvent.keyDown(document, { key: "ArrowUp" });
	expect(setSelectedServerIndexMock).toHaveBeenCalledWith(0);
});

test("select first server when arrow down is pressed", () => {
	const setSelectedServerIndexMock = vi.fn();

	render(
		<ServersContext value={[serverList, vi.fn()]}>
			<SelectedServerContext value={[null, setSelectedServerIndexMock]}>
				<ServerList />
			</SelectedServerContext>
		</ServersContext>
	);

	fireEvent.keyDown(document, { key: "ArrowDown" });
	expect(setSelectedServerIndexMock).toHaveBeenCalledWith(0);
});

test("moves selected server when arrow down is pressed with shift key", () => {
	const setServersMock = vi.fn();

	render(
		<ServersContext value={[serverList, setServersMock]}>
			<SelectedServerContext value={[0, vi.fn()]}>
				<ServerList />
			</SelectedServerContext>
		</ServersContext>
	);

	fireEvent.keyDown(document, { key: "ArrowDown", shiftKey: true });
	expect(setServersMock).toHaveBeenCalled();
});

test("moves selected server when arrow up is pressed with shift key", () => {
	const setServersMock = vi.fn();

	render(
		<ServersContext value={[serverList, setServersMock]}>
			<SelectedServerContext value={[1, vi.fn()]}>
				<ServerList />
			</SelectedServerContext>
		</ServersContext>
	);

	fireEvent.keyDown(document, { key: "ArrowUp", shiftKey: true });
	expect(setServersMock).toHaveBeenCalled();
});
