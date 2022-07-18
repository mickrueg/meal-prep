import React, { useContext, useEffect, useState } from 'react';
import './InfoMeal.css';
import { InfoContext } from '../Info/InfoContext';

const capitalize = (ingredientLabel) =>{
    return ingredientLabel.charAt(0).toUpperCase()+ingredientLabel.slice(1);
}

const InfoMeal = () => {
    const [displayMeal, setDisplayMeal] = useState()
    const { 
        mealImage,
        mealIngredients,
        mealRecipe} 
        = useContext(InfoContext);

    useEffect(()=>{
        console.log(mealIngredients)
        if(mealIngredients.length<1){
            setDisplayMeal(
                <div>
                    Nothing yet...
                </div>
            )
        } else {
            setDisplayMeal(
                    <ul className='ingredientList'>
                        {mealIngredients.map((e, index)=>{
                            return(
                            <li key={index} className='singleIngredient'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="singleIngredientX bi bi-x-square" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                </svg> 
                                <span className='singleIngredientText'>{capitalize(e.food)} - {Math.round(e.quantity*100)/100} {(e.measure=="<unit>" ? null : e.measure)}</span>
                            </li>
                            )
                        })}
                    </ul>
            )
        }


    },[mealIngredients]) 

    return (
        <div className='InfoMeal'>
            <div className='scrollable'>
                    <a href={mealRecipe} target="_blank" rel='noreferrer' className='RecipeLink'>
                        <img className='MealImage' src={mealImage} alt="Meal Selected"
                            onLoad={({currentTarget})=>{
                                currentTarget.style.display = 'block';
                            }} 
                            onError={({currentTarget})=>{
                                currentTarget.onerror = null;
                                console.log("Meal image inaccessible (403 Error). Display NA placeholder.")
                                currentTarget.style.display = 'none';
                            }}/>
                    </a>
                <div className='IngredientHeaderContainer'>
                    <h3>Ingredients</h3>
                    <span className='greenButton'>+ Meal Prep</span>
                </div>
                <hr></hr>
                {displayMeal}
            </div>
        </div>
    );
};

export default InfoMeal;