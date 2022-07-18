import React, { useContext } from 'react';
import './MealPrepMeals.css';
import { InfoContext } from '../Info/InfoContext';

const MealPrepMeals = () => {

    const { mainImages,
        mainRecipes,
        mainIngredients} = useContext(InfoContext);

    return (
        <div className='MealPrepMeals'>
            <hr></hr>
            {(mainImages.length<1?<div>Nothing</div>:<div>Something</div>)}
        </div>
    );
};

export default MealPrepMeals;