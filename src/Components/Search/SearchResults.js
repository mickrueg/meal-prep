import React, { useContext, useEffect, useState } from 'react';
import './SearchResults.css';
import searchResults from '../example.json';
import imageNA from "../../assets/imageNA.png";
import { InfoContext } from '../Info/InfoContext';


const SearchResults = () => {

    const [displayResults, setDisplayResults] = useState()

    useEffect(()=>{
        fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=pizza&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}`)
        .then(res=>res.json())
        .then(res=>{
            console.log("Fetch")
            const searchResultsArray = res.hits;
            setDisplayResults(
                searchResultsArray.map((e, index)=>{
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
                                    <span className='greenButton' onClick={()=>{openIngredientPanel(e)}}>Ingredients</span>
                                </div>
                                <div className='buttonContainer'>
                                    <span className='greenButton'>Recipe</span>
                                </div>
                                <div></div>
                            </div>
                        </div>
                    )
                })
            )
        })
        .catch(console.error)
    },[])
    
    
    const searchResultsArray = searchResults.hits;
    // const searchResultsArrayTwo = searchResults;
    const { infoState, setInfoState,
        mealImage, setMealImage,
        mealLabel, setMealLabel,
        mealIngredients, setMealIngredients,
        mealIngrQuantities,setMealIngrQuantities } 
        = useContext(InfoContext);

    const openIngredientPanel = (mealSelected) =>{
        setInfoState('InfoContainer Up');
        setMealImage(mealSelected.recipe.image);
        setMealLabel(mealSelected.recipe.label);
        console.log(mealSelected.recipe.label)
        // console.log(mealSelected);
    }
    
    // useEffect(()=>{
    //     console.log(meal['recipe']['label'])
    // })
    return (
        <div className='SearchResults'>
            {displayResults}
            {/* {searchResultsArray.map((e,index)=>{

                return(
                    <div className='resultContainer' key={index}>
                        <img 
                            src={e.recipe.image}
                            onError={({currentTarget})=>{
                                currentTarget.onerror = null;
                                console.log("Meal image inaccessible (403 Error). Display NA placeholder.")
                                currentTarget.src=imageNA;
                            }}
                            alt='pizza' 
                            className='resultImage'/>
                        <div className='textContainer'>
                            <h2 className='label'>{e.recipe.label}</h2>
                            <div className='buttonContainer'>
                                <span className='greenButton' onClick={()=>{openIngredientPanel(e)}}>Ingredients</span>
                            </div>
                            <div className='buttonContainer'>
                                <span className='greenButton'>Recipe</span>
                            </div>
                            <div></div>
                        </div>
                    </div>
                )
            })} */}
        </div>
    );
};

export default SearchResults;