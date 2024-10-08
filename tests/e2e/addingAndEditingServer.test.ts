import { test, expect } from "@playwright/test";
import { APP_DEV_URL } from "../../src/constants";

const addedServerIp = "ogulnie.ga";
const newServerIp = "hypixel.net";
const addedServerName = "test";

test("adding server and editing it works", async ({ page }) => {
	await page.goto(APP_DEV_URL);
	await page.getByRole("button", { name: "Add Server" }).click();
	await page.locator('input[name="server-address"]').fill(addedServerIp);

	await expect(page.getByRole("button", { name: "Done" })).toBeEnabled();
	await page.getByRole("button", { name: "Done" }).click();

	await page.locator("h3").first().click();
	await expect(page.getByRole("button", { name: "Edit" })).toBeEnabled();
	await page.getByRole("button", { name: "Edit" }).click();
	await expect(page.locator('input[name="server-address"]')).toHaveValue(
		addedServerIp
	);

	await page.locator('input[name="server-address"]').fill(newServerIp);
	await page.locator('input[name="server-name"]').fill(addedServerName);
	await page.getByRole("button", { name: "Done" }).click();
	await expect(
		page.getByRole("heading", { name: addedServerName })
	).toBeVisible();
});
