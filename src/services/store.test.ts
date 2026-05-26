import { rootReducer } from './store';

describe('rootReducer', () => {
  test('возвращает корректное начальное состояние', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredients: expect.any(Object),
      burgerConstructor: expect.any(Object),
      order: expect.any(Object),
      user: expect.any(Object),
      feed: expect.any(Object),
      orders: expect.any(Object),
      orderInfo: expect.any(Object)
    });
  });
});
