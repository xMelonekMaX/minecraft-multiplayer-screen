import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { PingIcon } from "../../src/components/PingIcon/PingIcon";

test("set correct icon when ping is null", () => {
	render(<PingIcon ping={null} />);

	const pingIcon = screen.getByRole("img");
	expect(pingIcon).toHaveAttribute("src", expect.stringMatching(/pinging_/));
});

test("set correct icon when ping is -1", () => {
	render(<PingIcon ping={-1} />);

	const pingIcon = screen.getByRole("img");
	expect(pingIcon).toHaveAttribute("src", expect.stringMatching(/unreachable/));
});

test("set correct icon when ping is 70", () => {
	render(<PingIcon ping={70} />);

	const pingIcon = screen.getByRole("img");
	expect(pingIcon).toHaveAttribute("src", expect.stringMatching(/ping_5/));
});

test("set correct icon when ping is 200", () => {
	render(<PingIcon ping={200} />);

	const pingIcon = screen.getByRole("img");
	expect(pingIcon).toHaveAttribute("src", expect.stringMatching(/ping_4/));
});

test("set correct icon when ping is 450", () => {
	render(<PingIcon ping={450} />);

	const pingIcon = screen.getByRole("img");
	expect(pingIcon).toHaveAttribute("src", expect.stringMatching(/ping_3/));
});

test("set correct icon when ping is 760", () => {
	render(<PingIcon ping={760} />);

	const pingIcon = screen.getByRole("img");
	expect(pingIcon).toHaveAttribute("src", expect.stringMatching(/ping_2/));
});

test("set correct icon when ping is 1430", () => {
	render(<PingIcon ping={1430} />);

	const pingIcon = screen.getByRole("img");
	expect(pingIcon).toHaveAttribute("src", expect.stringMatching(/ping_1/));
});
