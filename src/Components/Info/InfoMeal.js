import React, { useContext, useEffect, useState } from 'react';
import './InfoMeal.css';
import { InfoContext } from '../Info/InfoContext';

const capitalize = (ingredientLabel) =>{
    return ingredientLabel.charAt(0).toUpperCase()+ingredientLabel.slice(1);
}

const InfoMeal = () => {
    const [displayMeal, setDisplayMeal] = useState()
    const { 
        mealLabel,
        mealImage,
        mealIngredients,
        mealRecipe,
        mainIngredients, setMainIngredients,
        mainRecipes, setMainRecipes,
        setSearchContainerState,
        setSearchMain,
        setInfoState,
        setExportState,
        setExportText } 
        = useContext(InfoContext);
    const ingredientsArray = []
    mealIngredients.forEach((item) =>{
        return ingredientsArray.push({food: item.food, quantity: item.quantity, measure: item.measure})
    })
        
    useEffect(()=>{
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
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="singleIngredientX bi bi-x-square" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                </svg>  */}
                                <input type="checkbox" className="singleIngredientX" />
                                <span className='singleIngredientText'>{capitalize(e.food)} - {Math.round(e.quantity*100)/100} {(e.measure=="<unit>" ? null : e.measure)}</span>
                            </li>
                            )
                        })}
                    </ul>
            )
        }


    },[mealIngredients]) 


        //When new ingredients are added to main, sort ingredients and add quanities together for any identical ingredients
        function sortAndFilter(previousIngredients, newIngredients){
            let next = true;
            for (let i=0; i<newIngredients.length; i++){
                next = true;
                while (next){
                    for(let j=0; j<previousIngredients.length; j++){
                        if(previousIngredients.length>0 && 
                            newIngredients[i].food==previousIngredients[j].food &&
                            newIngredients[i].measure==previousIngredients[j].measure
                            ){
                                previousIngredients[j].quantity += newIngredients[i].quantity;
                                next=false;
                            }
                    }
                    if(next){
                        previousIngredients.push(newIngredients[i]);
                        next=false;
                    }
                }
            }

            previousIngredients.sort((a, b)=>{
                let first = a.food.toLowerCase(), second = b.food.toLowerCase();
                if(first<second){
                    return -1;
                }
                if(first>second){
                    return 1;
                }
                return 0;
            })

            return previousIngredients;
        }

        //When new recipes are added, check for duplicate images
        function uniqueRecipes(previousRecipes, newRecipe){
            let next = true;
                while (next){
                    for(let j=0; j<previousRecipes.length; j++){
                        if(previousRecipes.length>0 && 
                            newRecipe.label==previousRecipes[j].label){
                                next=false;
                            }
                    }
                    if(next){
                        previousRecipes.push(newRecipe);
                        next=false;
                    }
                }
            return previousRecipes;
        }

        function addMealPrep(){
        const ingredientsArrayMain = [];
        mealIngredients.forEach((item) =>{
            ingredientsArrayMain.push({food: item.food, quantity: item.quantity, measure: item.measure})
        })
        const sortedAndFiltered = sortAndFilter(mainIngredients, ingredientsArrayMain);
        console.log(sortedAndFiltered)
        setMainIngredients(()=>[...sortedAndFiltered]);
        
        const newRecipe = {label: mealLabel, recipe: mealRecipe, thumbnail: mealImage, ingredients: ingredientsArray, image: mealImage};
        const updatedRecipeList = uniqueRecipes(mainRecipes, newRecipe);
        console.log(updatedRecipeList)
        setMainRecipes(()=>[...updatedRecipeList])

        setSearchContainerState('SearchContainer');
        setSearchMain(`SearchMain`);
        setExportState('greenButton');
        setExportText('save to clipboard');
        setInfoState('InfoContainer');
    }

    return (
        <div className='InfoMeal'>
            
            <div className='scrollable'>
                    <a href={mealRecipe} target="_blank" rel='noreferrer' className='RecipeLink'>
                        <div className='recipe'>RECIPE</div>
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
                    <span className='greenButton' onClick={()=>{addMealPrep()}}>+ Meal Prep</span>
                </div>
                <hr></hr>
                {displayMeal}
            </div>
        </div>
    );
};

export default InfoMeal;