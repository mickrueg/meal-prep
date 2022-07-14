import React from 'react';
import './SearchMain.css';
import SearchResults from './SearchResults';
import SearchSelection from './SearchSelection';

const SearchMain = () => {
    return (
        <div className='SearchContainer'>
            <div className='SearchMain'>
                <h1>Search</h1>
                <SearchSelection />
                <SearchResults />
            </div>
        </div>
    );
};

export default SearchMain;