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
    const {
        mainRecipes,
        mainIngredients,
        setInfoState, setSearchMain,
        setMealImage,setMealLabel,
        setMealRecipe,
        setMealIngredients,
        exportState, setExportState,
        exportText, setExportText,
        setSearchContainerState } = useContext(InfoContext);

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
                                <div className='recipe'>RECIPE</div>
                                <img 
                                    src={e.thumbnail}
                                    onError={({currentTarget})=>{
                                        currentTarget.onerror = null;
                                        console.log("Meal image inaccessible (403 Error). Display NA placeholder.")
                                        currentTarget.src=imageNA;
                                    }}
                                    alt={e.label} 
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
                    <input type="checkbox" className="singleIngredientX" defaultChecked={false}/>
                    <span className='singleIngredientText'>{capitalize(e.food)} - {Math.round(e.quantity*100)/100} {(e.measure=="<unit>" ? null : e.measure)}</span>
                </li>)
            })}
        </ul>)
    }, [mainIngredients])

    function exportRecipes(){
        const recipes = mainRecipes.map((e)=>{
            return `${e.label}\n${e.recipe}\n`
        })
        const ingredients = mainIngredients.map((e)=>{
            return `${capitalize(e.food)} - ${Math.round(e.quantity*100)/100} ${(e.measure=="<unit>" || e.measure==null ? '' : e.measure)}\n`
        })

        navigator.clipboard.writeText(
            `RECIPES\n\n${recipes.join('')}\n\n\nGROCERY LIST\n\n${ingredients.join('')}`
        )
    }

    return (
        <div className='MealPrepMeals'>
            <div className='MealPrepMealsContainer'>
            {(mainRecipes.length<1?<div><h3>RECIPES</h3>Search for a tasty meal then click <b>"+ Meal Prep"</b> to add here!</div>:
            <div>
                <h3>RECIPES</h3>
                {displayMainRecipes}
                <br></br>
                <div className='instructionText'>Use the "Search" tool to add more recipes...</div>
            </div>)}
            <br></br>
            {(mainIngredients.length<1?<div><h3>GROCERY LIST</h3>Once your meals are selected, all the ingredients will display here :)</div>:<div><h3>GROCERY LIST</h3>{displayMainIngredients}</div>)}
            <br></br>
            {(mainRecipes.length<1? null : 
            <div>
                <hr></hr><br></br>
                <b>EXPORT 
                    <span 
                    className={exportState} 
                    onClick={()=>{
                        exportRecipes();
                        setExportState('greenButton clicked');
                        setExportText('saved to clipboard');

                    }}>{exportText}</span></b>
                    <br></br><br></br><div className='instructionText'>Save the recipes and ingredients above to your clipboard. After saving, you can "paste" the items to your notes.</div>
            </div>)}
            </div>
        </div>
    );
};

export default MealPrepMeals;