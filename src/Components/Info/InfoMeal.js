import React, { useContext, useEffect, useState } from 'react';
import './InfoMeal.css';
import { InfoContext } from '../Info/InfoContext';



const InfoMeal = () => {
    const [displayMeal, setDisplayMeal] = useState()
    const { 
        mealImage,
        mealIngredients} 
        = useContext(InfoContext);

    useEffect(()=>{
        // console.log(`Meal Ingredients: ${JSON.stringify(mealIngredients)}`)
        console.log(mealIngredients)
        // console.log(mealIngredients[0]);
        if(mealIngredients.length<1){
            setDisplayMeal(
                <div>
                    Nothing yet...
                </div>
            )
        } else {
            setDisplayMeal(
                    <ul>
                        {mealIngredients.map((e, index)=>{
                            return(
                            <li key={index}>
                                {e.food} : {e.quantity} : {e.measure}
                            </li>
                            )
                        })}
                    </ul>
            )
        }


    },[mealIngredients]) 

    return (
        <div className='InfoMeal'>
            <img className='MealImage' src={mealImage} alt="Meal Selected"
                onLoad={({currentTarget})=>{
                    currentTarget.style.display = 'block';
                }} 
                onError={({currentTarget})=>{
                    currentTarget.onerror = null;
                    console.log("Meal image inaccessible (403 Error). Display NA placeholder.")
                    currentTarget.style.display = 'none';
                }}/>
            <div className='IngredientHeaderContainer'>
                <h1>Ingredients</h1>
                <span className='greenButton'>add all to list +</span>
            </div>
            {displayMeal}
        </div>
    );
};

export default InfoMeal;