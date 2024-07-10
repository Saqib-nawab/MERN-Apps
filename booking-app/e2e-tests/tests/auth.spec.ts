import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

//user auth tests
test("should allow the user to sign in", async ({ page }) => {
  //test name
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click(); //if page contains anything as sign in Link

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.getByRole("link", { name: "Sign In" }).click(); //if page contains anything as sign in Button

  await page.locator("[name=email]").fill("1@1.com"); //filling the form using PlayWright if any element with name email exists then fill it
  await page.locator("[name=password]").fill("password123");

  await page.getByRole("button", { name: "Login" }).click(); // if login button is exists

  //after login button  is clicked does the following appears
  await expect(page.getByText("Sign in Successful!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
