import { type Page, type Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly title: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.getByTestId('title');
        this.cartBadge = page.getByTestId('shopping-cart-badge');
    }

    async addToCart(productName: string) {
        await this.page
            .getByTestId('inventory-item')
            .filter({ hasText: productName })
            .getByRole('button', { name: 'Add to cart' })
            .click();
    }

    async removeFromCart(productName: string) {
        await this.page
            .getByTestId('inventory-item')
            .filter({ hasText: productName })
            .getByRole('button', { name: 'Remove' })
            .click();
    }
}