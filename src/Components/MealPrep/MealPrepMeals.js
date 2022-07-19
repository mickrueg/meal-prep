import React, { useContext, useEffect, useState } from 'react';
import './MealPrepMeals.css';
import { InfoContext } from '../Info/InfoContext';
import imageNA from "../../assets/imageNA.png";

const capitalize = (ingredientLabel) =>{
    return ingredientLabel.charAt(0).toUpperCase()+ingredientLabel.slice(1);
}

const MealPrepMeals = () => {

    const [displayMainIngredients, setDisplayMainIngredients] = useState();
    const [displayMainRecipes, setDisplayMainRecipes] = useState();
    const { mainImages,
        mainRecipes,
        mainIngredients, setMainIngredients,
        setInfoState, setSearchMain,
        setMealImage,setMealLabel,
        setMealRecipe,
        setMealIngredients,
        mainIngredientsOrganized, setMainIngredientsOrganized} = useContext(InfoContext);

    const openIngredientPanel = () =>{
        setInfoState('InfoContainer Up');
        setSearchMain(`SearchMain mid`);
    }

    useEffect(()=>{
        setDisplayMainRecipes(<div>
            {mainRecipes.map((e, index)=>{
                return (
                        <div className='resultContainer main' key={index}>
                            <div className='imageContainer'>
                            <a href={e.recipe} target="_blank" rel='noreferrer' className='RecipeLink'>
                                <img 
                                    src={e.thumbnail}
                                    onError={({currentTarget})=>{
                                        currentTarget.onerror = null;
                                        console.log("Meal image inaccessible (403 Error). Display NA placeholder.")
                                        currentTarget.src=imageNA;
                                    }}
                                    alt='pizza' 
                                    className='resultImage'/>
                            </a>
                            </div>
                            <div className='textContainer'>
                                <h2 className='label'>{e.label}</h2>
                                <div className='buttonContainer'>
                                    {/* Assign info panel with selected meal's information */}
                                    <span className='greenButton' onClick={()=>{
                                        openIngredientPanel();
                                        setMealImage(e.image);
                                        setMealLabel(e.label);
                                        setMealRecipe(e.url);
                                        let ingredientsArray = []
                                        e.ingredients.map((item) =>{
                                            return ingredientsArray.push({food: item.food, quantity: item.quantity, measure: item.measure})
                                        }
                                        
                                        )
                                        setMealIngredients(ingredientsArray);
                                        }}>Ingredients</span>
                                </div>
                            </div>
                        </div>

                )
            })}
        </div>)
    },[mainRecipes])

    useEffect(()=>{
        setDisplayMainIngredients(<ul className='ingredientList'>

            {mainIngredients.map((e,index)=>{
                return(<li key={index} className='singleIngredient'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="singleIngredientX bi bi-x-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    </svg> 
                    {capitalize(e.food)} - {e.quantity} {(e.measure=="<unit>" ? null : e.measure)}
                </li>)
            })}
        </ul>)
        // console.log(mainIngredients[0]);
    }, [mainIngredients])

    return (
        <div className='MealPrepMeals'>
            <div className='MealPrepMealsContainer'>
            {(mainRecipes.length<1?<div><h3>MEALS TO PREP</h3>Search for a tasty meal and click "+ Meal Prep" to add here!</div>:<div><h3>MEALS TO PREP</h3>{displayMainRecipes}</div>)}
            <br></br>
            {(mainIngredients.length<1?<div><h3>GROCERY LIST</h3>Once your meals are selected, all the ingredients will display here :)</div>:<div><h3>GROCERY LIST</h3>{displayMainIngredients}</div>)}
            </div>
        </div>
    );
};

export default MealPrepMeals;