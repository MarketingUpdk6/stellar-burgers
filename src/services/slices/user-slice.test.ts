import {
  userReducer,
  fetchUser,
  loginUser,
  registerUser,
  updateUser,
  logoutUser,
  setAuthChecked
} from './user-slice';

const userMock = {
  email: 'test@test.ru',
  name: 'Test User'
};

describe('userSlice', () => {
  test('устанавливает loginRequest=true при loginUser.pending', () => {
    const state = userReducer(undefined, loginUser.pending('', {
      email: 'test@test.ru',
      password: '123456'
    }));

    expect(state.loginRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  test('сохраняет пользователя при loginUser.fulfilled', () => {
    const state = userReducer(undefined, loginUser.fulfilled(userMock, '', {
      email: 'test@test.ru',
      password: '123456'
    }));

    expect(state.user).toEqual(userMock);
    expect(state.loginRequest).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });

  test('сохраняет ошибку при loginUser.rejected', () => {
    const state = userReducer(undefined, loginUser.rejected(
      new Error('Ошибка входа'),
      '',
      { email: 'test@test.ru', password: '123456' }
    ));

    expect(state.loginRequest).toBe(false);
    expect(state.error).toBe('Ошибка входа');
  });

  test('сохраняет пользователя при fetchUser.fulfilled', () => {
    const state = userReducer(undefined, fetchUser.fulfilled(userMock, ''));

    expect(state.user).toEqual(userMock);
    expect(state.isAuthChecked).toBe(true);
  });

  test('обновляет пользователя при updateUser.fulfilled', () => {
    const state = userReducer(undefined, updateUser.fulfilled(userMock, '', {
      name: 'Test User',
      email: 'test@test.ru'
    }));

    expect(state.user).toEqual(userMock);
  });

  test('очищает пользователя при logoutUser.fulfilled', () => {
    const stateWithUser = userReducer(undefined, loginUser.fulfilled(userMock, '', {
      email: 'test@test.ru',
      password: '123456'
    }));

    const state = userReducer(stateWithUser, logoutUser.fulfilled(undefined, ''));

    expect(state.user).toBeNull();
  });

  test('устанавливает флаг проверки авторизации', () => {
    const state = userReducer(undefined, setAuthChecked(true));

    expect(state.isAuthChecked).toBe(true);
  });
});
