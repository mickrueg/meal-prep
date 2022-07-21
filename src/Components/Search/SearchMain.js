import React, { useContext, useState } from 'react';
import { InfoContext } from '../Info/InfoContext';
import Draggable from 'react-draggable';
import './SearchMain.css';
import SearchResults from './SearchResults';
import SearchSelection from './SearchSelection';

const upArrow='M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z';
const downArrow='M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z';

const SearchMain = () => {
    const nodeRef = React.useRef(null);

    const [arrow, setArrow] = useState(upArrow);
    const {setInfoState, searchMain, searchContainerState, setSearchContainerState} = useContext(InfoContext);

    const mobileSnap = () =>{
        if(searchContainerState==='SearchContainer'){
            setSearchContainerState('SearchContainer Up');
            setArrow(downArrow);
        } else {
            setSearchContainerState('SearchContainer');
            setInfoState('InfoContainer');
            setArrow(upArrow);
        }
    }


    return (
        <Draggable
                nodeRef={nodeRef} 
                grid={[0,0]}
                onStop={mobileSnap}
                axis='y'
                handle='#handle'
                >
                <div className={searchContainerState} ref={nodeRef}>
                    <div className={searchMain}>
                        <div className='SearchHeader' id="handle">
                            <h1 onClick={mobileSnap}>Search</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="arrow" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d={arrow}/>
                            </svg>
                        </div>
                        <SearchSelection />
                            <hr className='SearchResultsContainerTop'></hr>
                        <div className='SearchResultsContainer'>
                            <SearchResults />
                        </div>
                    </div>
                </div>
        </Draggable>


    );
};

export default SearchMain;