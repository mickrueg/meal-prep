import React, { useState } from 'react';
import './SearchResults.css';
import searchResults from '../example.json';
import imageNA from "../../assets/imageNA.png";


const SearchResults = () => {
    const searchResultsArray = searchResults.hits;
    console.log(searchResultsArray[19].recipe.image);
    // const url = searchResultsArray[19].recipe.image;

//     function httpGetAsync(url, callback)
// {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function() { 
//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
//             callback(xmlHttp.responseText);
//     }
//     xmlHttp.open("GET", theUrl, true); // true for asynchronous 
//     xmlHttp.send(null);
// }

return (
    <div className='SearchResults'>
            {searchResultsArray.map((e,index)=>{

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