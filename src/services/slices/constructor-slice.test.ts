import {
  constructorReducer,
  addIngredient,
  removeIngredient,
  moveIngredient
} from './constructor-slice';

let uuidCounter = 0;

beforeAll(() => {
  Object.defineProperty(global, 'crypto', {
    value: {
      randomUUID: jest.fn(() => `test-uuid-${uuidCounter++}`)
    }
  });
});

const bun = {
  _id: '1',
  name: 'Булка',
  type: 'bun'
};

const main = {
  _id: '2',
  name: 'Котлета',
  type: 'main'
};

describe('constructorSlice', () => {
  test('добавляет булку в конструктор', () => {
    const state = constructorReducer(undefined, addIngredient(bun as any));

    expect(state.bun).toEqual(expect.objectContaining(bun));
  });

  test('добавляет начинку в конструктор', () => {
    const state = constructorReducer(undefined, addIngredient(main as any));

    expect(state.ingredients).toHaveLength(1);

    expect(state.ingredients[0]).toEqual(expect.objectContaining(main));
  });

  test('удаляет ингредиент из конструктора', () => {
    const addedState = constructorReducer(
      undefined,
      addIngredient(main as any)
    );

    const ingredientId = addedState.ingredients[0].id;

    const state = constructorReducer(
      addedState,
      removeIngredient(ingredientId)
    );

    expect(state.ingredients).toHaveLength(0);
  });

  test('меняет порядок ингредиентов', () => {
    const firstState = constructorReducer(
      undefined,
      addIngredient(main as any)
    );

    const secondIngredient = {
      ...main,
      _id: '3',
      name: 'Сыр'
    };

    const secondState = constructorReducer(
      firstState,
      addIngredient(secondIngredient as any)
    );

    const state = constructorReducer(
      secondState,
      moveIngredient({
        fromIndex: 0,
        toIndex: 1
      })
    );

    expect(state.ingredients[0].name).toBe('Сыр');
    expect(state.ingredients[1].name).toBe('Котлета');
  });
});
