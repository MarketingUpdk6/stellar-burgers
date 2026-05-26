import { ordersReducer, fetchOrders } from './orders-slice';

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

describe('ordersSlice', () => {
  test('устанавливает isLoading=true при pending', () => {
    const state = ordersReducer(undefined, fetchOrders.pending(''));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('сохраняет заказы и устанавливает isLoading=false при fulfilled', () => {
    const state = ordersReducer(
      undefined,
      fetchOrders.fulfilled(ordersMock, '')
    );

    expect(state.orders).toEqual(ordersMock);
    expect(state.isLoading).toBe(false);
  });

  test('сохраняет ошибку и устанавливает isLoading=false при rejected', () => {
    const state = ordersReducer(
      undefined,
      fetchOrders.rejected(new Error('Ошибка загрузки'), '')
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
