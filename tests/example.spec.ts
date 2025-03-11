import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Navigation', async ({ page }) => {
  const usersTab = await page.getByRole('tab', { name: /users/i });
  const postsTab = await page.getByRole('tab', { name: /posts/i });

  // verify that by default the users page is loaded and the "Users" tab is selected
  await expect(page).toHaveURL(/\/users$/);
  await expect(usersTab).toHaveAttribute('aria-selected', 'true');
  await expect(postsTab).toHaveAttribute('aria-selected', 'false');

  // verify that the posts page is loaded and the tab selection updates after clicking the "Posts" tab
  await postsTab.click();
  await expect(page).toHaveURL(/\/posts$/);
  await expect(usersTab).toHaveAttribute('aria-selected', 'false');
  await expect(postsTab).toHaveAttribute('aria-selected', 'true');
});

test.describe('Users page', () => {
  test('Spinner', async ({ page }) => {
    const spinner = await page.getByRole('progressbar');
    await expect(spinner).toBeVisible();
    await page.waitForResponse((response) => response.url().includes('/users') && response.status() === 200);
    await expect(spinner).not.toBeVisible();
  });

  test('Error', async ({ page }) => {
    await page.route('**/users', (route) => route.fulfill({ status: 500 }));
    await page.reload();
    await page.goto('/');
    await expect(await page.getByRole('alert')).toBeVisible();
  });

  test('List content', async ({ page }) => {
    await page.waitForResponse((response) => response.url().includes('/users') && response.status() === 200);
    expect(await page.locator('table tbody tr').count()).toBe(10);
  });

  // verify that the edit button triggers the modal
  test('Edit user modal', async ({ page }) => {
    await page.waitForResponse((response) => response.url().includes('/users') && response.status() === 200);
    const editButton = await page.getByRole('button', { name: /edit/i }).first();
    await editButton.click();
    const modal = await page.getByRole('dialog');
    await expect(modal).toBeVisible();
    const closeButton = await modal.getByRole('button', { name: /close/i });
    await closeButton.click();
    await expect(modal).not.toBeVisible();
  });

  // verify that empty fields are displayed when the modal is opened
  test('Add user modal', async ({ page }) => {
    await page.waitForResponse((response) => response.url().includes('/users') && response.status() === 200);
    const addButton = await page.getByRole('button', { name: /add new user/i });
    await addButton.click();
    const modal = await page.getByRole('dialog');
    await expect(modal).toBeVisible();
    const nameInput = await modal.getByLabel('Name', { exact: true });
    const usernameInput = await modal.getByLabel('Username', { exact: true });
    const emailInput = await modal.getByLabel('Email');
    const phoneInput = await modal.getByLabel('Phone');
    const websiteInput = await modal.getByLabel('Website');
    expect(await nameInput.inputValue()).toBe('');
    expect(await usernameInput.inputValue()).toBe('');
    expect(await emailInput.inputValue()).toBe('');
    expect(await phoneInput.inputValue()).toBe('');
    expect(await websiteInput.inputValue()).toBe('');
  });
});
