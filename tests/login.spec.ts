import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Skenario Login', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('user berhasil login', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');

        await expect(page).toHaveURL(/inventory\.html/);
        await expect(page.getByTestId('title')).toHaveText('Products');
    });

    test('user salah password', async () => {
        await loginPage.login('standard_user', 'password_salah');

        await expect(loginPage.errorMessage).toContainText(
            'Username and password do not match any user in this service'
        );
    });

    test('user tidak mengisi password', async () => {
        await loginPage.login('standard_user', '');

        await expect(loginPage.errorMessage).toContainText('Password is required');
    });

    test('user terkunci tidak bisa login', async () => {
        await loginPage.login('locked_out_user', 'secret_sauce');

        await expect(loginPage.errorMessage).toContainText(
            'Sorry, this user has been locked out'
        );
    });
});