import React from 'react';
import MealPrepList from './MealPrepList';
import './MealPrepMain.css';
import MealPrepMeals from './MealPrepMeals';

const MealPrepMain = () => {
    return (
        <div className='MealPrepContainer'>
            <div className='MealPrepMain'>
                <h1>Meal Prep</h1>
                <MealPrepMeals />
                <MealPrepList />
            </div>
        </div>
    );
};

export default MealPrepMain;