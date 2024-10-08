import { expect, test } from "vitest";
import { PlayerCount } from "../../src/components/PlayerCount/PlayerCount";
import { render } from "@testing-library/react";

test("should render standard player count text", () => {
	const { container } = render(<PlayerCount online={1} maxPlayers={10} />);
	expect(container).toHaveTextContent("1/10");
});

test("should render custom player count text", () => {
	const expectedText = "test message";

	const { container } = render(
		<PlayerCount
			online={1}
			maxPlayers={10}
			extra={<span>{expectedText}</span>}
		/>
	);
	expect(container).toHaveTextContent(expectedText);
});
