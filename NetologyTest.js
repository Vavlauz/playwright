const { chromium } = require("playwright");
const { expect } = require("@playwright/test");
const user = require("../user");

//positive case
(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://netology.ru/?modal=sign_in", {
    waitUntil: "load",
    timeout: 0,
  });
  // Click [placeholder="Email"]
  await page.locator('[placeholder="Email"]').click();
  // Fill [placeholder="Email"]
  await page.locator('[placeholder="Email"]').fill(user.credentials.validMail);
  // Press Tab
  await page.locator('[placeholder="Email"]').press("Tab");
  // Fill [placeholder="Пароль"]
  await page
    .locator('[placeholder="Пароль"]')
    .fill(user.credentials.validPassword);
  // Click [data-testid="login-submit-btn"]
  await page.locator('[data-testid="login-submit-btn"]').click();
  await page.waitForURL("https://netology.ru/profile", {
    waitUntil: "load",
    timeout: 0,
  });
  await expect(page.locator("text=Мои курсы и профессии")).toBeVisible();
  await context.close();
  await browser.close();
})();

//negative case
(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://netology.ru/?modal=sign_in", {
    waitUntil: "load",
    timeout: 0,
  });
  // Click [placeholder="Email"]
  await page.locator('[placeholder="Email"]').click();
  // Fill [placeholder="Email"]
  await page
    .locator('[placeholder="Email"]')
    .fill(user.credentials.InvalidMail);
  // Press Tab
  await page.locator('[placeholder="Email"]').press("Tab");
  // Fill [placeholder="Пароль"]
  await page
    .locator('[placeholder="Пароль"]')
    .fill(user.credentials.InvalidPassword);
  // Click [data-testid="login-submit-btn"]
  await page.locator('[data-testid="login-submit-btn"]').click();
  await expect(
    page.locator("text=Вы ввели неправильно логин или пароль")
  ).toBeVisible();
  await context.close();
  await browser.close();
})();
