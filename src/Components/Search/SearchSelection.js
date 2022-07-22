import React, { useContext, useRef, useState } from 'react';
import { InfoContext } from '../Info/InfoContext';
import './SearchSelection.css';


const SearchSelection = () => {
    const inputRef = useRef(null);

    const mealTypes = ['breakfast', 'lunch', 'dinner', 'all'];

    const { setSearchKeyword, mealType, setMealType } 
        = useContext(InfoContext);

    const [searchfield, setSearchfield] = useState('search-field');
    function clickHandler(){
        setSearchfield('search-field selected')
    }

    function search(e){
        e.preventDefault();
        setSearchKeyword(inputRef.current.value);
    }

    return (
        
        <div className='SearchSelection'>
            <div className={searchfield} onClick={clickHandler}>
                <ul className="mealChoices">
                    {mealTypes.map((e,index)=>{
                    if(mealType===e){
                        return(<li key={index} className="mealChoice selected" id={e}>{e}</li>)
                    }else{
                        return(<li key={index} className="mealChoice" id={e} onClick={()=>setMealType(e)}>{e}</li>)
                    }
                    })}
                </ul>
                <form className='searchBox' onSubmit={search}>
                    <input 
                        className='searchBoxInput' 
                        type="text" 
                        placeholder="Search meals..." 
                        ref={inputRef}/>
                    <button className='searchBoxButton' type="submit">search</button>
                </form >
                </div>
        </div>
    );
};

export default SearchSelection;