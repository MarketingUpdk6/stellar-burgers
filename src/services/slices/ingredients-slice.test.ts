import { ingredientsReducer, fetchIngredients } from './ingredients-slice';

const ingredientsMock = [
  {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 100,
    price: 100,
    image: '',
    image_mobile: '',
    image_large: ''
  }
];

describe('ingredientsSlice', () => {
  test('устанавливает isLoading=true при pending', () => {
    const state = ingredientsReducer(undefined, fetchIngredients.pending(''));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('сохраняет ингредиенты при fulfilled', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.fulfilled(ingredientsMock, '')
    );

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(ingredientsMock);
    expect(state.error).toBeNull();
  });

  test('сохраняет ошибку при rejected', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.rejected(new Error('Ошибка загрузки'), '')
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
