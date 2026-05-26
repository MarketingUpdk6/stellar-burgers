import { test, expect } from '@playwright/test';
import ingredientsMock from './hars/ingredients.json';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/ingredients', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(ingredientsMock)
      });
    });

    await page.goto('/');
  });

  test('отображает ингредиенты после загрузки с сервера', async ({ page }) => {
    await expect(page.getByText('Краторная булка N-200i')).toBeVisible();
    await expect(
      page.getByText('Биокотлета из марсианской Магнолии')
    ).toBeVisible();
  });

  test('добавляет булку и начинку в конструктор', async ({ page }) => {
    await expect(page.getByText('Краторная булка N-200i')).toBeVisible();
    await expect(
      page.getByText('Биокотлета из марсианской Магнолии')
    ).toBeVisible();

    await page
      .getByTestId('ingredient-643d69a5c3f7b9001cfa093c')
      .getByText('Добавить')
      .click();

    await page
      .getByTestId('ingredient-643d69a5c3f7b9001cfa0941')
      .getByText('Добавить')
      .click();

    await expect(page.getByText('Краторная булка N-200i').nth(1)).toBeVisible();
    await expect(
      page.getByText('Биокотлета из марсианской Магнолии').nth(1)
    ).toBeVisible();
  });

  test('открывает и закрывает модальное окно ингредиента', async ({ page }) => {
    await page.getByTestId('ingredient-643d69a5c3f7b9001cfa093c').click();

    await expect(page.getByTestId('modal')).toBeVisible();

    await expect(
      page.getByTestId('modal').locator('h3', {
        hasText: 'Детали ингредиента'
      })
    ).toBeVisible();

    await expect(
      page.getByTestId('modal').getByText('Краторная булка N-200i')
    ).toBeVisible();

    await page.getByTestId('modal-close').click();

    await expect(page.getByTestId('modal')).not.toBeVisible();
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

    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'test-refresh-token');
    });

    await page.route('**/auth/user', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          user: {
            email: 'test@test.ru',
            name: 'Test User'
          }
        })
      });
    });

    await page.route('**/orders', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            name: 'Краторный бургер',
            order: {
              number: 12345
            }
          })
        });
      } else {
        await route.continue();
      }
    });

    await page.reload();
    await expect(page).toHaveURL('/');
    await page
      .getByTestId('ingredient-643d69a5c3f7b9001cfa093c')
      .getByText('Добавить')
      .click();

    await page
      .getByTestId('ingredient-643d69a5c3f7b9001cfa0941')
      .getByText('Добавить')
      .click();

    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    await expect(page.getByTestId('modal')).toBeVisible();
    await expect(page.getByText('12345')).toBeVisible();

    await page.getByTestId('modal-close').click();

    await expect(page.getByTestId('modal')).not.toBeVisible();
    await expect(page.getByText('Выберите булки').first()).toBeVisible();
    await expect(page.getByText('Выберите начинку')).toBeVisible();

    await context.clearCookies();
    await page.evaluate(() => {
      localStorage.removeItem('refreshToken');
    });
  });
});
