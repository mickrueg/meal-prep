import React, { useEffect, useState } from 'react';
import './SearchSelection.css';


const SearchSelection = () => {
    const mealTypes = ['breakfast', 'lunch', 'dinner', 'all'];
    const [mealChoiceSelected, setMealChoiceSelected] = useState('all');

    const [searchfield, setSearchfield] = useState('search-field');
    function clickHandler(){
        setSearchfield('search-field selected')
    }

    function search(e){
        e.preventDefault();
    }

    return (
        
        <div className='SearchSelection'>
            <div className={searchfield} onClick={clickHandler}>
                <ul className="mealChoices">
                    {mealTypes.map((e,index)=>{
                    if(mealChoiceSelected==e){
                        return(<li key={index} className="mealChoice selected" id={e}>{e}</li>)
                    }else{
                        return(<li key={index} className="mealChoice" id={e} onClick={()=>setMealChoiceSelected(e)}>{e}</li>)
                    }
                    })}
                </ul>
                <form className='searchBox' onSubmit={search}>
                    <input className='searchBoxInput' type="text" placeholder="Search meals..."/>
                    <button className='searchBoxButton' type="submit">search</button>
                </form >
                </div>
        </div>
    );
};

export default SearchSelection;