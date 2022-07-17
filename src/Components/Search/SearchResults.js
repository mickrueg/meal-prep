import React, { useContext, useEffect, useState } from 'react';
import './SearchResults.css';
import imageNA from "../../assets/imageNA.png";
import { InfoContext } from '../Info/InfoContext';


const SearchResults = () => {
    
    const [displayResults, setDisplayResults] = useState()
    
    const { setInfoState,
        setMealImage,
        setMealLabel,
        setMealIngredients,
        setMealIngrQuantities,
        searchKeyword, setSearchKeyword,
        mealType, setMealType } 
        = useContext(InfoContext);
    
    const openIngredientPanel = (mealSelected) =>{
        setInfoState('InfoContainer Up');
        setMealImage(mealSelected.recipe.image);
        setMealLabel(mealSelected.recipe.label);
    }

    
    const url= `https://api.edamam.com/api/recipes/v2?type=public&q=${searchKeyword}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}`

    useEffect(()=>{
        // fetch(`../example.json`)
        fetch(mealType==='all'? url : url+`&mealType=${mealType}`)
        .then(res=>res.json())
        .then(res=>{
            console.log(`Fetch keyword [${searchKeyword}] & meal type [${mealType}]`)
            const searchResultsArray = res.hits;
            setDisplayResults(
                searchResultsArray.map((e, index)=>{
                    if(searchKeyword==null && index==0){
                        return(
                            <div className='resultContainer' key={index}>
                                <div className='BlankSearch'>
                                    No meals to show. Try selecting a meal type and searching your favorite dish. Then click <b>"search"!</b>
                                </div>
                            </div>
                        )
                    } else if(searchKeyword==null && index>0){

                    } else {
                        return(
                            <div className='resultContainer' key={index}>
                                <div className='imageContainer'>
                                <img 
                                    src={e.recipe.image}
                                    onError={({currentTarget})=>{
                                        currentTarget.onerror = null;
                                        console.log("Meal image inaccessible (403 Error). Display NA placeholder.")
                                        currentTarget.src=imageNA;
                                    }}
                                    alt='pizza' 
                                    className='resultImage'/>
                                </div>
                                <div className='textContainer'>
                                    <h2 className='label'>{e.recipe.label}</h2>
                                    <div className='buttonContainer'>
                                        <span className='greenButton' onClick={()=>{
                                            openIngredientPanel(e)
                                            setMealIngredients(e.recipe.ingredients)
                                            }}>Ingredients</span>
                                    </div>
                                    <div className='buttonContainer'>
                                        <a href={e.recipe.url} target="_blank" rel='noreferrer' className='RecipeLink'>
                                            <span className='greenButton'>Recipe</span>
                                        </a>
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
    },[searchKeyword, mealType])

    return (
        <div className='SearchResults'>
            {displayResults}
        </div>
    );
};

export default SearchResults;