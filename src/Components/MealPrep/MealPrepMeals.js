import React, { useContext, useEffect, useState } from 'react';
import './MealPrepMeals.css';
import { InfoContext } from '../Info/InfoContext';

const capitalize = (ingredientLabel) =>{
    return ingredientLabel.charAt(0).toUpperCase()+ingredientLabel.slice(1);
}

const MealPrepMeals = () => {

    const [displayMainIngredients, setDisplayMainIngredients] = useState();
    const { mainImages,
        mainRecipes,
        mainIngredients, setMainIngredients} = useContext(InfoContext);

    useEffect(()=>{
        setDisplayMainIngredients(<ul>
            {mainIngredients.map((e,index)=>{
                return(<li key={index}>
                    {e.food}
                </li>)
            })}
        </ul>)
        // console.log(mainIngredients[0]);
    },[mainIngredients])

    return (
        <div className='MealPrepMeals'>
            <hr></hr>
            {(mainImages.length<1?<div><b>DISHES</b></div>:<div>Something</div>)}
            <b>INGREDIENTS</b>
            <ul>
                {displayMainIngredients}
            </ul>
        </div>
    );
};

export default MealPrepMeals;