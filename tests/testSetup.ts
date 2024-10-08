import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
	cleanup();

	vi.mock("react-router-dom", () => ({
		...vi.importActual("react-router-dom"),
		useNavigate: () => vi.fn(),
		useParams: () => vi.fn(),
		Navigate: vi.fn(),
	}));
});
