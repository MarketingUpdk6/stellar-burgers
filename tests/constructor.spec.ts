import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/ingredients',
      update: false,
      updateContent: 'embed'
    });

    await page.routeFromHAR('./tests/hars/user.har', {
      url: '**/auth/user',
      update: false,
      updateContent: 'embed'
    });

    await page.routeFromHAR('./tests/hars/order.har', {
      url: '**/orders',
      update: false,
      updateContent: 'embed'
    });

    await page.goto('/');
  });

  test.afterEach(async ({ context, page }) => {
    await context.clearCookies();

    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test('отображает ингредиенты после загрузки с сервера', async ({ page }) => {
    await expect(page.getByText('Краторная булка N-200i')).toBeVisible();

    await expect(
      page.getByText('Биокотлета из марсианской Магнолии')
    ).toBeVisible();
  });

  test('добавляет булку и начинку в конструктор', async ({ page }) => {
    const constructor = page.getByTestId('burger-constructor');

    await page
      .getByTestId('ingredient-643d69a5c3f7b9001cfa093c')
      .getByText('Добавить')
      .click();

    await page
      .getByTestId('ingredient-643d69a5c3f7b9001cfa0941')
      .getByText('Добавить')
      .click();

    await expect(
      constructor.getByText('Краторная булка N-200i (верх)')
    ).toBeVisible();

    await expect(
      constructor.getByText('Краторная булка N-200i (низ)')
    ).toBeVisible();

    await expect(
      constructor.getByText('Биокотлета из марсианской Магнолии')
    ).toBeVisible();
  });

  test('открывает и закрывает модальное окно ингредиента', async ({ page }) => {
    await page.getByTestId('ingredient-643d69a5c3f7b9001cfa093c').click();

    const modal = page.getByTestId('modal');

    await expect(modal).toBeVisible();

    await expect(modal.getByText('Краторная булка N-200i')).toBeVisible();

    await page.mouse.click(10, 10);

    await expect(modal).not.toBeVisible();
  });

  test('создаёт заказ и очищает конструктор', async ({ page, context }) => {
    await context.addCookies([
      {
        name: 'accessToken',
        value: 'Bearer test-access-token',
        domain: 'localhost',
        path: '/'
      }
    ]);

    await context.addInitScript(() => {
      localStorage.setItem('refreshToken', 'test-refresh-token');
    });

    await page.reload();

    const constructor = page.getByTestId('burger-constructor');

    await page
      .getByTestId('ingredient-643d69a5c3f7b9001cfa093c')
      .getByText('Добавить')
      .click();

    await page
      .getByTestId('ingredient-643d69a5c3f7b9001cfa0941')
      .getByText('Добавить')
      .click();

    await page
      .getByRole('button', {
        name: 'Оформить заказ'
      })
      .click();

    const modal = page.getByTestId('modal');

    await expect(modal).toBeVisible();

    await expect(modal.getByTestId('order-number')).toHaveText('12345');

    await page.getByTestId('modal-close').click();

    await expect(modal).not.toBeVisible();

    await expect(
      constructor.getByTestId('constructor-empty-bun').first()
    ).toBeVisible();

    await expect(
      constructor.getByTestId('constructor-empty-bun').nth(1)
    ).toBeVisible();

    await expect(
      constructor.getByTestId('constructor-empty-fillings')
    ).toBeVisible();
  });
});
