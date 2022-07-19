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

                        //Set Variables
                        const ingredientsArray = []
                        e.recipe.ingredients.forEach((item) =>{
                            return ingredientsArray.push({food: item.food, quantity: item.quantity, measure: item.measure})
                        })
                        const recipeLink = e.recipe.url;
                        const recipeImageThumbnail = e.recipe.images.THUMBNAIL.url;
                        const recipeImage = e.recipe.image;
                        const recipeLabel = e.recipe.label;

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
                        // function uniqueRecipes(recipeList){
                        //     const uniqueLabels = [];
                        //     const unique = recipeList.filter(element => {
                        //       const isDuplicate = uniqueLabels.includes(element.label);
                        //       if (!isDuplicate) {
                        //         uniqueLabels.push(element.label);
                        //         return true;
                        //       }
                        //       return false;
                        //     });
                        //     console.log(unique);
                        //     return unique;
                        // }
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



                        return(
                            <div className='resultContainer' key={index}>
                                <div className='imageContainer'>
                                <a href={recipeLink} target="_blank" rel='noreferrer' className='RecipeLink'>
                                    <img 
                                        src={recipeImageThumbnail}
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
                                    <h2 className='label'>{recipeLabel}</h2>
                                    <div className='buttonContainer'>
                                        {/* Assign info panel with selected meal's information */}
                                        <span className='greenButton' onClick={()=>{
                                            openIngredientPanel();
                                            setMealImage(recipeImage);
                                            setMealLabel(recipeLabel);
                                            setMealRecipe(recipeLink);
                                            setMealIngredients(ingredientsArray);
                                            }}>Ingredients</span>
                                    </div>
                                    <div className='buttonContainer'>
                                        <span className='greenButton' onClick={()=>{
                                            const ingredientsArrayMain = [];
                                            e.recipe.ingredients.forEach((item) =>{
                                                ingredientsArrayMain.push({food: item.food, quantity: item.quantity, measure: item.measure})
                                            })
                                            const sortedAndFiltered = sortAndFilter(mainIngredients, ingredientsArrayMain);
                                            console.log(sortedAndFiltered)
                                            setMainIngredients(()=>[...sortedAndFiltered]);
                                            
                                            const newRecipe = {label: e.recipe.label, recipe: e.recipe.url, thumbnail: e.recipe.images.THUMBNAIL.url, ingredients: ingredientsArray, image: e.recipe.image};
                                            const updatedRecipeList = uniqueRecipes(mainRecipes, newRecipe);
                                            console.log(updatedRecipeList)
                                            setMainRecipes(()=>[...updatedRecipeList])
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