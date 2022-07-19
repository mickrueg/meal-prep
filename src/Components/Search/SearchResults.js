import React, { useContext, useEffect, useState } from 'react';
import './SearchResults.css';
import imageNA from "../../assets/imageNA.png";
import { InfoContext } from '../Info/InfoContext';

//Search Functionality
const SearchResults = () => {
    
    //States
    const [displayResults, setDisplayResults] = useState()
    const { setInfoState,
        setMealImage,
        setMealLabel,
        setMealIngredients,
        setMealRecipe,
        searchKeyword,
        mealType,
        setSearchMain,
        mainImages, setMainImages,
        mainRecipes, setMainRecipes,
        mainIngredients, setMainIngredients, 
        mainIngredientsOrganized} 
        = useContext(InfoContext);
    
    //Open & close Ingredient Panel Function
    const openIngredientPanel = () =>{
        setInfoState('InfoContainer Up');
        setSearchMain(`SearchMain mid`);
    }

    //Add to Main
    const addToMain = (selected) =>{
        // setMainImages([...mainImages, selected.recipe.images.THUMBNAIL.url]);
        // setMainRecipes([...mainRecipes, selected.recipe.url]);
        // setMainIngredients([...mainIngredients, selected.recipe.ingredients]);
    }


    //Link to API
    const url= `https://api.edamam.com/api/recipes/v2?type=public&q=${searchKeyword}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}`


    //UseEffect to fetch from API each time a new search is performed
    useEffect(()=>{
        // fetch(`../example.json`)
        fetch(mealType==='all'? url : url+`&mealType=${mealType}`)
        .then(res=>res.json())
        .then(res=>{
            console.log(`Fetch keyword [${searchKeyword}] & meal type [${mealType}]`)
            const searchResultsArray = res.hits;
            setDisplayResults(
                searchResultsArray.map((e, index)=>{

                    //Before search is performed, display instruction text
                    if(searchKeyword==null && index==0){
                        return(
                            <div className='resultContainer' key={index}>
                                <div className='BlankSearch'>
                                    Try searching by <b>meal type</b> or <b>keyword</b> above to display some tasty dishes!
                                </div>
                            </div>
                        )
                    } else if(searchKeyword==null && index>0){
                        return null;
                    } 
                    
                    //Once search is performed, display results in list. Add buttons for ingredients and recipe.
                    else {
                        return(
                            <div className='resultContainer' key={index}>
                                <div className='imageContainer'>
                                <a href={e.recipe.url} target="_blank" rel='noreferrer' className='RecipeLink'>
                                    <img 
                                        src={e.recipe.images.THUMBNAIL.url}
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
                                    <h2 className='label'>{e.recipe.label}</h2>
                                    <div className='buttonContainer'>
                                        {/* Assign info panel with selected meal's information */}
                                        <span className='greenButton' onClick={()=>{
                                            openIngredientPanel();
                                            setMealImage(e.recipe.image);
                                            setMealLabel(e.recipe.label);
                                            setMealRecipe(e.recipe.url);
                                            let ingredientsArray = []
                                            e.recipe.ingredients.map((item) =>{
                                                return ingredientsArray.push({food: item.food, quantity: item.quantity, measure: item.measure})
                                            }
                                            
                                            )
                                            setMealIngredients(ingredientsArray);
                                            }}>Ingredients</span>
                                    </div>
                                    <div className='buttonContainer'>
                                        <span className='greenButton' onClick={()=>{
                                            let ingredientsArrayMain = []
                                            e.recipe.ingredients.forEach((item) =>{
                                                ingredientsArrayMain.push({food: item.food, quantity: item.quantity, measure: item.measure})
                                            }
                                            )

                                            //Series of next items sorts and filters data to single ingredients
                                            let sortedAndFiltered = mainIngredients;
                                            let next = true;
                                            for (let i=0; i<ingredientsArrayMain.length; i++){
                                                next = true;
                                                while (next){
                                                    for(let j=0; j<sortedAndFiltered.length; j++){
                                                        if(sortedAndFiltered.length>0 && 
                                                            ingredientsArrayMain[i].food==sortedAndFiltered[j].food &&
                                                            ingredientsArrayMain[i].measure==sortedAndFiltered[j].measure
                                                            ){
                                                                sortedAndFiltered[j].quantity += ingredientsArrayMain[i].quantity;
                                                                next=false;
                                                            }
                                                    }
                                                    if(next){
                                                        sortedAndFiltered.push(ingredientsArrayMain[i]);
                                                        next=false;
                                                    }
                                                }
                                            }
                                            console.log(sortedAndFiltered)
                                            setMainIngredients(sortedAndFiltered);
                                            // setMainIngredients((current)=>{return [...current,...ingredientsArrayMain]});
                                            let ingredientsArray = []
                                            e.recipe.ingredients.map((item) =>{
                                                return ingredientsArray.push({food: item.food, quantity: item.quantity, measure: item.measure})
                                            }
                                            
                                            )
                                            setMainRecipes(current=>{
                                                return [...current, {label: e.recipe.label, recipe: e.recipe.url, thumbnail: e.recipe.images.THUMBNAIL.url, ingredients: ingredientsArray, image: e.recipe.image}]
                                            })
                                        }}>+ Meal Prep</span>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                        )
                    }
                })
            )
        })
        .catch(console.error)
    },

    //Monitor change in searchKeyword and mealType
    [searchKeyword, mealType])

    return (
        <div className='SearchResults'>
            {displayResults}
        </div>
    );
};

export default SearchResults;