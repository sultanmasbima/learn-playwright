import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Skenario Cart', () => {
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');

        inventoryPage = new InventoryPage(page);
        await expect(inventoryPage.title).toHaveText('Products');
    });

    test('menambahkan 1 produk ke cart', async () => {
        await inventoryPage.addToCart('Sauce Labs Backpack');

        await expect(inventoryPage.cartBadge).toHaveText('1');
    });

    test('menambahkan 2 produk ke cart', async () => {
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await inventoryPage.addToCart('Sauce Labs Bike Light');

        await expect(inventoryPage.cartBadge).toHaveText('2');
    });

    test('menambahkan lalu menghapus produk dari cart', async () => {
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await expect(inventoryPage.cartBadge).toHaveText('1');

        await inventoryPage.removeFromCart('Sauce Labs Backpack');
        await expect(inventoryPage.cartBadge).toBeHidden();
    });
});