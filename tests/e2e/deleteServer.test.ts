import { test, expect } from "@playwright/test";
import { APP_DEV_URL } from "../../src/constants";

const serverIp = "hypixel.net";

test("delete server works", async ({ page }) => {
	await page.goto(`${APP_DEV_URL}`);
	await page.getByRole("button", { name: "Add Server" }).click();
	await page.locator('input[name="server-address"]').fill(serverIp);
	await page.getByRole("button", { name: "Done" }).click();
	await page.locator("h3").first().click();

	await expect(page.getByRole("button", { name: "Delete" })).toBeEnabled();

	await page.getByRole("button", { name: "Delete" }).click();
	await page.getByRole("button", { name: "Delete" }).click();

	await expect(page.locator("h3").first()).toBeHidden();
});
