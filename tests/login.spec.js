const { test, expect } = require('@playwright/test');

const loginData = require('../test-data/loginData');

const URL = 'https://www.saucedemo.com/';

test.beforeEach(async ({ page }) => {
    await page.goto(URL);
});


test.describe('SauceDemo Login - Positive Tests', () => {

    test('TC_LOGIN_001 - Login with valid credentials', async ({ page }) => {

        await page.getByPlaceholder('Username')
            .fill(loginData.validUser.username);

        await page.getByPlaceholder('Password')
            .fill(loginData.validUser.password);

        await page.getByRole('button', { name: 'Login' })
            .click();

        await expect(page).toHaveURL(/inventory.html/);

        await expect(
            page.getByText('Products')
        ).toBeVisible();
    });


    test('TC_LOGIN_003 - Login using Enter key', async ({ page }) => {

        await page.getByPlaceholder('Username')
            .fill('standard_user');

        await page.getByPlaceholder('Password')
            .fill('secret_sauce');

        await page.getByPlaceholder('Password')
            .press('Enter');

        await expect(page).toHaveURL(/inventory.html/);
    });


    test('TC_LOGIN_005 - Login with problem user', async ({ page }) => {

        await page.getByPlaceholder('Username')
            .fill(loginData.problemUser.username);

        await page.getByPlaceholder('Password')
            .fill(loginData.problemUser.password);

        await page.getByRole('button', { name: 'Login' })
            .click();

        await expect(page).toHaveURL(/inventory.html/);
    });


    test('TC_LOGIN_006 - Login with performance glitch user', async ({ page }) => {

        await page.getByPlaceholder('Username')
            .fill(loginData.performanceUser.username);

        await page.getByPlaceholder('Password')
            .fill(loginData.performanceUser.password);

        await page.getByRole('button', { name: 'Login' })
            .click();

        await expect(page).toHaveURL(/inventory.html/);
    });

});


test.describe('SauceDemo Login - Negative Tests', () => {

    test('TC_LOGIN_009 - Invalid username', async ({ page }) => {

        await page.getByPlaceholder('Username')
            .fill('invalid_user');

        await page.getByPlaceholder('Password')
            .fill('secret_sauce');

        await page.getByRole('button', { name: 'Login' })
            .click();

        await expect(
            page.locator('[data-test="error"]')
        ).toBeVisible();
    });


    test('TC_LOGIN_010 - Invalid password', async ({ page }) => {

        await page.getByPlaceholder('Username')
            .fill('standard_user');

        await page.getByPlaceholder('Password')
            .fill('wrong_password');

        await page.getByRole('button', { name: 'Login' })
            .click();

        await expect(
            page.locator('[data-test="error"]')
        ).toBeVisible();

        await expect(page).not.toHaveURL(/inventory.html/);
    });


    test('TC_LOGIN_014 - Blank username and password', async ({ page }) => {

        await page.getByRole('button', { name: 'Login' })
            .click();

        await expect(
            page.locator('[data-test="error"]')
        ).toBeVisible();
    });


    test('TC_LOGIN_029 - Locked out user', async ({ page }) => {

        await page.getByPlaceholder('Username')
            .fill(loginData.lockedUser.username);

        await page.getByPlaceholder('Password')
            .fill(loginData.lockedUser.password);

        await page.getByRole('button', { name: 'Login' })
            .click();

        await expect(
            page.locator('[data-test="error"]')
        ).toBeVisible();

        await expect(page).not.toHaveURL(/inventory.html/);
    });

});


test.describe('SauceDemo Login - UI Tests', () => {

    test('TC_LOGIN_042 - Verify login page elements', async ({ page }) => {

        await expect(
            page.getByPlaceholder('Username')
        ).toBeVisible();

        await expect(
            page.getByPlaceholder('Password')
        ).toBeVisible();

        await expect(
            page.getByRole('button', { name: 'Login' })
        ).toBeVisible();
    });


    test('TC_LOGIN_037 - Verify password is masked', async ({ page }) => {

        await expect(
            page.getByPlaceholder('Password')
        ).toHaveAttribute('type', 'password');
    });

});


test.describe('SauceDemo Login - E2E Tests', () => {

    test('TC_LOGIN_063 - Login and logout', async ({ page }) => {

        await page.getByPlaceholder('Username')
            .fill('standard_user');

        await page.getByPlaceholder('Password')
            .fill('secret_sauce');

        await page.getByRole('button', { name: 'Login' })
            .click();

        await expect(page).toHaveURL(/inventory.html/);

        await page.getByRole('button', { name: 'Open Menu' })
            .click();

        await page.getByRole('button', { name: 'Logout' })
            .click();

        await expect(page).toHaveURL(URL);
    });

});