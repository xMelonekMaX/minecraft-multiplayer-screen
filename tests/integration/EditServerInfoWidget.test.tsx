import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { EditServerInfoWidget } from "../../src/components/EditServerInfoWidget/EditServerInfoWidget";
import { ServersContext } from "../../src/contexts/ServersContext";
import { SelectedServerContext } from "../../src/contexts/SelectedServerContext";

const targetServerIndex = 0;
const serverList = [
	{
		id: targetServerIndex,
		name: "Server A",
		ipAddress: "127.0.0.1",
		resourcePacksOption: 0,
	},
] as Server[];
const reactRouterDom = await import("react-router-dom");
window.HTMLMediaElement.prototype.play = vi.fn();

test("changing resource packs option works", async () => {
	vi.spyOn(reactRouterDom, "useParams").mockReturnValue({
		serverIndex: targetServerIndex.toString(),
	});

	render(
		<ServersContext value={[serverList, vi.fn()]}>
			<SelectedServerContext value={[null, vi.fn()]}>
				<EditServerInfoWidget title="Some Title" />
			</SelectedServerContext>
		</ServersContext>
	);

	const resourcePacksSelector = screen.getByRole("button", {
		name: /Server Resource Packs: /i,
	});

	expect(resourcePacksSelector).toHaveTextContent(
		"Server Resource Packs: Prompt"
	);
	await resourcePacksSelector.click();
	expect(resourcePacksSelector).toHaveTextContent(
		"Server Resource Packs: Enabled"
	);
	await resourcePacksSelector.click();
	await resourcePacksSelector.click();
	expect(resourcePacksSelector).toHaveTextContent(
		"Server Resource Packs: Prompt"
	);
});

test("displays empty form if serverIndex is null", () => {
	vi.spyOn(reactRouterDom, "useParams").mockReturnValue({
		serverIndex: undefined,
	});

	render(
		<ServersContext value={[[], vi.fn()]}>
			<SelectedServerContext value={[null, vi.fn()]}>
				<EditServerInfoWidget title="Some Title" />
			</SelectedServerContext>
		</ServersContext>
	);

	const serverNameInput = screen.getAllByRole("textbox")[0];
	const serverAddressInput = screen.getAllByRole("textbox")[1];
	const resourcePacksSelector = screen.getByRole("button", {
		name: "Server Resource Packs: Prompt",
	});

	expect(serverNameInput).toHaveDisplayValue("");
	expect(serverAddressInput).toHaveDisplayValue("");
	expect(resourcePacksSelector).toBeInTheDocument();
});

test("displays server data in the form", () => {
	vi.spyOn(reactRouterDom, "useParams").mockReturnValue({
		serverIndex: targetServerIndex.toString(),
	});

	//Test with non-default value
	serverList[0].resourcePacksOption = 1;

	render(
		<ServersContext value={[serverList, vi.fn()]}>
			<SelectedServerContext value={[targetServerIndex, vi.fn()]}>
				<EditServerInfoWidget title="Some Title" />
			</SelectedServerContext>
		</ServersContext>
	);

	const serverNameInput = screen.getAllByRole("textbox")[0];
	const serverAddressInput = screen.getAllByRole("textbox")[1];
	const resourcePacksSelector = screen.getByRole("button", {
		name: "Server Resource Packs: Enabled",
	});

	expect(serverNameInput).toHaveDisplayValue(serverList[0].name);
	expect(serverAddressInput).toHaveDisplayValue(serverList[0].ipAddress);
	expect(resourcePacksSelector).toBeInTheDocument();
});

test("done button is disabled when ip address is empty", () => {
	vi.spyOn(reactRouterDom, "useParams").mockReturnValue({
		serverIndex: undefined,
	});

	render(
		<ServersContext value={[[], vi.fn()]}>
			<SelectedServerContext value={[null, vi.fn()]}>
				<EditServerInfoWidget title="Some Title" />
			</SelectedServerContext>
		</ServersContext>
	);

	const serverAddressInput = screen.getAllByRole("textbox")[1];
	const doneButton = screen.getByRole("button", { name: "Done" });

	expect(serverAddressInput).toHaveDisplayValue("");
	expect(doneButton).toBeDisabled();
});

test("done button is enabled when ip address is filled", () => {
	vi.spyOn(reactRouterDom, "useParams").mockReturnValue({
		serverIndex: targetServerIndex.toString(),
	});

	render(
		<ServersContext value={[serverList, vi.fn()]}>
			<SelectedServerContext value={[targetServerIndex, vi.fn()]}>
				<EditServerInfoWidget title="Some Title" />
			</SelectedServerContext>
		</ServersContext>
	);

	const serverAddressInput = screen.getAllByRole("textbox")[1];
	const doneButton = screen.getByRole("button", { name: "Done" });

	expect(serverAddressInput).toHaveDisplayValue(serverList[0].ipAddress);
	expect(doneButton).toBeEnabled();
});
