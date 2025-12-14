// tests/login.spec.js
const { test, expect } = require('@playwright/test');

test('Użytkownik może wejść na stronę logowania', async ({ page }) => {
  // 1. Wejdź na stronę główną (adres Twojej apki)
  await page.goto('http://localhost:3000/');

  // 2. Znajdź w Sidebarze link, który prowadzi do "/user/signin" i kliknij go
  // (Nawet jeśli to ikona, Playwright znajdzie ją po hrefie)
  await page.locator('a[href="/user/signin"]').first().click();

  // 3. Sprawdź, czy adres URL zmienił się na stronę logowania
  await expect(page).toHaveURL('http://localhost:3000/user/signin');

  // 4. Sprawdź, czy na stronie jest widoczny nagłówek lub przycisk związany z logowaniem
  // Szukamy przycisku "Zaloguj się" lub nagłówka "Logowanie"
  await expect(page.locator('button', { hasText: 'Zaloguj' }).first()).toBeVisible();
});