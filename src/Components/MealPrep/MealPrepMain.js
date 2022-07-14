import React from 'react';
import MealPrepList from './MealPrepList';
import './MealPrepMain.css';
import MealPrepMeals from './MealPrepMeals';

const MealPrepMain = () => {
    return (
        <div className='MealPrepMain'>
            <h1>Meal Prep</h1>
            <MealPrepMeals />
            <MealPrepList />
        </div>
    );
};

export default MealPrepMain;