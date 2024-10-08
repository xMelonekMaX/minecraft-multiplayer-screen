import { test, expect } from "@playwright/test";
import { APP_DEV_URL } from "../../src/constants";

const addedServerIp = "hypixel.net";

test("adding server via url works", async ({ page }) => {
	await page.goto(`${APP_DEV_URL}/${addedServerIp}`);
	await expect(page.getByRole("img").first()).toBeVisible();
});
