import { expect, test, vi } from "vitest";
import { ServerListButtons } from "../../src/components/ServerListButtons/ServerListButtons";
import { render, screen } from "@testing-library/react";
import { SelectedServerContext } from "../../src/contexts/SelectedServerContext";
import { ServersContext } from "../../src/contexts/ServersContext";

test("edit, delete and join buttons are disabled when selectedServerIndex is null", () => {
	const mockSetSelectedServerIndex = vi.fn();
	const mockSetServers = vi.fn();

	render(
		<ServersContext value={[[], mockSetServers]}>
			<SelectedServerContext value={[null, mockSetSelectedServerIndex]}>
				<ServerListButtons />
			</SelectedServerContext>
		</ServersContext>
	);

	const editButton = screen.getByText("Edit");
	const deleteButton = screen.getByText("Delete");
	const joinButton = screen.getByText("Join Server");

	expect(editButton).toBeDisabled();
	expect(deleteButton).toBeDisabled();
	expect(joinButton).toBeDisabled();
});
