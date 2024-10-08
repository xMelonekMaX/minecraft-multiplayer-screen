import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { Button } from "../../src/components/Button/Button";

test("should run the passed function and play a sound when clicked", () => {
	const mockPlaySound = vi.fn();
	const mockOnClick = vi.fn();

	window.HTMLMediaElement.prototype.play = mockPlaySound;

	render(
		<Button size="MEDIUM" onClick={mockOnClick}>
			Click me
		</Button>
	);

	const button = screen.getByText("Click me");
	fireEvent.click(button);

	expect(mockOnClick).toHaveBeenCalled();
	expect(mockPlaySound).toHaveBeenCalled();
});
