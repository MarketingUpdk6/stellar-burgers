import { feedReducer, fetchFeeds } from './feed-slice';

const ordersMock = [
  {
    _id: 'order-1',
    status: 'done',
    name: 'Тестовый заказ',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    number: 1,
    ingredients: ['ingredient-1']
  }
];

const feedMock = {
  success: true,
  orders: ordersMock,
  total: 10,
  totalToday: 2
};

describe('feedSlice', () => {
  test('устанавливает isLoading=true при pending', () => {
    const state = feedReducer(undefined, fetchFeeds.pending(''));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('сохраняет данные ленты и устанавливает isLoading=false при fulfilled', () => {
    const state = feedReducer(undefined, fetchFeeds.fulfilled(feedMock, ''));

    expect(state.orders).toEqual(ordersMock);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(2);
    expect(state.isLoading).toBe(false);
  });

  test('сохраняет ошибку и устанавливает isLoading=false при rejected', () => {
    const state = feedReducer(
      undefined,
      fetchFeeds.rejected(new Error('Ошибка загрузки'), '')
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
