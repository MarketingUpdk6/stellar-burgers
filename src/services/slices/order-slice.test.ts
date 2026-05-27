import { orderReducer, createOrder, closeOrderModal } from './order-slice';

const orderMock = {
  _id: 'order-id',
  ingredients: ['1', '2'],
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
  price: 1000
};

describe('orderSlice', () => {
  test('устанавливает orderRequest=true при pending', () => {
    const state = orderReducer(undefined, createOrder.pending('', ['1', '2']));

    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  test('сохраняет данные заказа при fulfilled', () => {
    const state = orderReducer(
      undefined,
      createOrder.fulfilled(orderMock, '', ['1', '2'])
    );

    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(orderMock);
  });

  test('сохраняет ошибку при rejected', () => {
    const state = orderReducer(
      undefined,
      createOrder.rejected(new Error('Ошибка заказа'), '', ['1', '2'])
    );

    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка заказа');
  });

  test('закрывает модальное окно заказа', () => {
    const stateWithOrder = orderReducer(
      undefined,
      createOrder.fulfilled(orderMock, '', ['1', '2'])
    );

    const state = orderReducer(stateWithOrder, closeOrderModal());

    expect(state.orderModalData).toBeNull();
  });
});
