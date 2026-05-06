import { FC } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../app/app.module.css';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Preloader } from '../ui/preloader';

import { useSelector } from '../../services/store';
import {
  selectIngredients,
  selectIngredientsLoading
} from '../../services/selectors';

export const IngredientDetails: FC = () => {
  const { id } = useParams();

  const ingredients = useSelector(selectIngredients);
  const isIngredientsLoading = useSelector(selectIngredientsLoading);

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (isIngredientsLoading) {
    return <Preloader />;
  }

  if (!ingredientData) {
    return (
      <p className='text text_type_main-medium pt-10'>Ингредиент не найден</p>
    );
  }

  return (
    <div className={styles.detailPageWrap}>
      <h1 className={`${styles.detailHeader} text text_type_main-large`}>
        Детали ингредиента
      </h1>

      <IngredientDetailsUI ingredientData={ingredientData} />
    </div>
  );
};
