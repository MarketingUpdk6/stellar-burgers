import { expect, test, describe } from '@jest/globals';
import store, { rootReducer } from './store';

describe('rootReducer', () => {
  test('возвращает корректное начальное состояние при неизвестном action', () => {
    const action = { type: 'UNKNOWN_ACTION' };

    const initialState = rootReducer(undefined, action);

    expect(initialState).toEqual(store.getState());
  });
});
