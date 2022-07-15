import React from 'react';
import './SearchResults.css';
import searchResults from '../example.json';

const SearchResults = () => {
    const searchResultsArray = searchResults.hits;
    console.log(searchResultsArray)
    return (
        <div className='SearchResults'>
            {searchResultsArray.map((e,index)=>{
                return(
                    <div className='resultContainer' key={index}>
                        <img src={e.recipe.image} alt='pizza' className='resultImage'/>
                        <div className='textContainer'>
                            <h2 className='label'>{e.recipe.label}</h2>
                            <div className='buttonContainer'>
                                <span className='greenButton'>Ingredients</span>
                            </div>
                            <div className='buttonContainer'>
                                <span className='greenButton'>Recipe</span>
                            </div>
                            <div></div>
                        </div>

                    </div>
                )
            })}
             <div className='resultContainer'>
                        <img src={searchResultsArray[19].recipe.image} alt='pizza' className='resultImage'/>
                        <div className='textContainer'>
                            <h2 className='label'>{searchResultsArray[0].recipe.label}</h2>
                            <span className='greenButton'>Ingredients</span>
                            <span className='greenButton'>Recipe</span>
                        </div>
                    </div>
        </div>
    );
};

export default SearchResults;