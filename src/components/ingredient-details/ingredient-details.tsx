import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { IngredientDetailsUI } from '../ui/ingredient-details';

import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/selectors';

export const IngredientDetails: FC = () => {
  const { id } = useParams();

  const ingredients = useSelector(selectIngredients);

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return (
      <p className='text text_type_main-medium pt-10'>Ингредиент не найден</p>
    );
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
