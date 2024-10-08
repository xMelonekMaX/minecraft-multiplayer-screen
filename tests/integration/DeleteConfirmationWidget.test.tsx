import { expect, test, vi } from "vitest";
import { DeleteConfirmationWidget } from "../../src/components/DeleteConfirmationWidget/DeleteConfirmationWidget";
import { render, screen } from "@testing-library/react";
import { SelectedServerContext } from "../../src/contexts/SelectedServerContext";
import { ServersContext } from "../../src/contexts/ServersContext";

const targetServerIndex = 0;
const reactRouterDom = await import("react-router-dom");

test("should display the server name correctly", () => {
	vi.spyOn(reactRouterDom, "useParams").mockReturnValue({
		serverIndex: targetServerIndex.toString(),
	});
	const serverName = "Server A";

	render(
		<ServersContext
			value={[
				[
					{ id: targetServerIndex, name: serverName, ipAddress: "127.0.0.1" },
				] as Server[],
				vi.fn(),
			]}
		>
			<SelectedServerContext value={[targetServerIndex, vi.fn()]}>
				<DeleteConfirmationWidget />
			</SelectedServerContext>
		</ServersContext>
	);

	const warningText = screen.getByText(
		`'${serverName}' will be lost forever! (A long time!)`
	);
	expect(warningText).toBeInTheDocument();
});
