import {
  orderInfoReducer,
  fetchOrderByNumber
} from './order-info-slice';

const orderMock = {
  _id: 'order-1',
  status: 'done',
  name: 'Тестовый заказ',
  owner: {
    name: 'Test User',
    email: 'test@test.ru',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  number: 12345,
  price: 1000,
  ingredients: ['ingredient-1']
};

describe('orderInfoSlice', () => {
  test('устанавливает isLoading=true при pending', () => {
    const state = orderInfoReducer(
      undefined,
      fetchOrderByNumber.pending('', 12345)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('сохраняет заказ и устанавливает isLoading=false при fulfilled', () => {
    const state = orderInfoReducer(
      undefined,
      fetchOrderByNumber.fulfilled(orderMock, '', 12345)
    );

    expect(state.order).toEqual(orderMock);
    expect(state.isLoading).toBe(false);
  });

  test('сохраняет ошибку и устанавливает isLoading=false при rejected', () => {
    const state = orderInfoReducer(
      undefined,
      fetchOrderByNumber.rejected(
        new Error('Ошибка загрузки'),
        '',
        12345
      )
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
