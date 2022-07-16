import React, { useContext, useState } from 'react';
import './InfoMeal.css';
import { InfoContext } from '../Info/InfoContext';


const InfoMeal = () => {
    const { infoState, setInfoState,
        mealImage, setMealImage,
        mealLabel, setMealLabel,
        mealIngredients, setMealIngredients,
        mealIngrQuantities,setMealIngrQuantities } 
        = useContext(InfoContext);
    const [imageRender, setImageRender] = useState({display: "block"})

    return (
        <div className='InfoMeal'>
            <img className='MealImage' src={mealImage} alt="Meal Selected"
                onLoad={({currentTarget})=>{
                    currentTarget.style.display = 'block';
                }} 
                onError={({currentTarget})=>{
                    currentTarget.onerror = null;
                    console.log("Meal image inaccessible (403 Error). Display NA placeholder.")
                    // currentTarget.src=imageNA;
                    currentTarget.style.display = 'none';
                }}/>
            <div className='IngredientHeaderContainer'>
                <h1>Ingredients</h1>
                <span className='greenButton'>add all to list +</span>
            </div>
        </div>
    );
};

export default InfoMeal;