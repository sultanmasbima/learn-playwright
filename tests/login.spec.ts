import { test, expect } from '@playwright/test';

test.describe('Skenario Login', () => {

    // Otomatis dijalankan sebelum SETIAP test di dalam grup ini
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    });

    test('user berhasil login', async ({ page }) => {
        // 1. Buka halaman
        await page.goto('https://www.saucedemo.com/');

        // 2. Isi form login
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();

        // 3. Verifikasi: halaman Products muncul
        await expect(page.getByText('Products')).toBeVisible();
    });

    test('user salah password', async ({ page }) => {
        const randomPassword = crypto.randomUUID();

        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill(randomPassword);
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.locator('[data-test="error"]')).toContainText(
            'Username and password do not match any user in this service'
        );
    });

    test('user tidak mengisi password', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.locator('[data-test="error"]')).toContainText(
            'Epic sadface: Password is required'
        );
    });

});
