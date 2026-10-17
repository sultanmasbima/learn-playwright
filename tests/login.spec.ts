import { test, expect } from '@playwright/test';

test.describe('Skenario Login', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('user berhasil login', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page).toHaveURL(/inventory\.html/);
        await expect(page.getByTestId('title')).toHaveText('Products');
    });

    test('user salah password', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('password_salah');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.getByTestId('error')).toContainText(
            'Username and password do not match any user in this service'
        );
    });

    test('user tidak mengisi password', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.getByTestId('error')).toContainText('Password is required');
    });

    test('user terkunci tidak bisa login', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('locked_out_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.getByTestId('error')).toContainText(
            'Sorry, this user has been locked out'
        );
    });

});