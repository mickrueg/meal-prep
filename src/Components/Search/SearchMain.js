import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './SearchMain.css';
import SearchResults from './SearchResults';
import SearchSelection from './SearchSelection';

const SearchMain = () => {
    const nodeRef = React.useRef(null);
    const [searchContainer, setSearchContainer] = useState('SearchContainer');
    const mobileSnap = () =>{
        return (searchContainer==='SearchContainer' ?setSearchContainer('SearchContainer Up') : setSearchContainer('SearchContainer'));
    }
    return (
        <Draggable 
            nodeRef={nodeRef} 
            grid={[0,0]}
            // bounds='parent'
            onStop={mobileSnap}
            axis='y'>
            <div className={searchContainer} ref={nodeRef}>
                <div className='SearchMain'>
                    <h1>Search</h1>
                    <SearchSelection />
                    <SearchResults />
                </div>
            </div>
        </Draggable>

    );
};

export default SearchMain;