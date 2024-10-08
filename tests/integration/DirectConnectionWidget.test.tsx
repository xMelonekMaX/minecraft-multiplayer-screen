import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { DirectConnectionWidget } from "../../src/components/DirectConnectionWidget/DirectConnectionWidget";

test("join button is disabled when ip address is empty", () => {
	render(<DirectConnectionWidget title="Some Title" />);

	const joinButton = screen.getByText("Join Server");
	expect(joinButton).toBeDisabled();
});

test("join button is enabled when ip address is filled", () => {
	render(<DirectConnectionWidget title="Some Title" />);

	const ipAddressInput = screen.getByRole("textbox");
	fireEvent.change(ipAddressInput, { target: { value: "127.0.0.1" } });

	const joinButton = screen.getByText("Join Server");
	expect(joinButton).toBeEnabled();
});
