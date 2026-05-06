import { RootState } from './store';

export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;

export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;

export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;

export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor;

export const selectOrderRequest = (state: RootState) =>
  state.order.orderRequest;

export const selectOrderModalData = (state: RootState) =>
  state.order.orderModalData;

export const selectUser = (state: RootState) => state.user.user;

export const selectIsAuthChecked = (state: RootState) =>
  state.user.isAuthChecked;

export const selectLoginRequest = (state: RootState) => state.user.loginRequest;

export const selectFeedOrders = (state: RootState) => state.feed.orders;

export const selectFeedTotal = (state: RootState) => state.feed.total;

export const selectFeedTotalToday = (state: RootState) => state.feed.totalToday;

export const selectFeedLoading = (state: RootState) => state.feed.isLoading;

export const selectFeedError = (state: RootState) => state.feed.error;

export const selectProfileOrders = (state: RootState) => state.orders.orders;

export const selectProfileOrdersLoading = (state: RootState) =>
  state.orders.isLoading;

export const selectProfileOrdersError = (state: RootState) =>
  state.orders.error;

export const selectOrderInfo = (state: RootState) => state.orderInfo.order;

export const selectOrderInfoLoading = (state: RootState) =>
  state.orderInfo.isLoading;

export const selectOrderInfoError = (state: RootState) => state.orderInfo.error;

export const selectBuns = (state: RootState) =>
  state.ingredients.ingredients.filter((item) => item.type === 'bun');

export const selectMains = (state: RootState) =>
  state.ingredients.ingredients.filter((item) => item.type === 'main');

export const selectSauces = (state: RootState) =>
  state.ingredients.ingredients.filter((item) => item.type === 'sauce');
