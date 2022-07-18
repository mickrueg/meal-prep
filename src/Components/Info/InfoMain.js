import React, { useContext } from 'react';
import './InfoMain.css';
import InfoMeal from './InfoMeal';
import { InfoContext } from './InfoContext';
import Draggable from 'react-draggable';

const downArrow='M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z';

const InfoMain = () => {
    const nodeRef = React.useRef(null);
    const {infoState, setInfoState, mealLabel, setSearchMain} = useContext(InfoContext);

    const mobileSnap = () =>{
            setInfoState('InfoContainer');
            setSearchMain(`SearchMain`)
    }


    return (
        <Draggable
            nodeRef={nodeRef}
            grid={[0,0]}
            onStop={mobileSnap}
            axis='y'
            handle='#handle'
            className='InfoDraggable'
            >
            <div className={infoState} ref={nodeRef}>
                <div className='InfoMain'>
                    <div className='InfoHeader' id="handle">
                        <h1>{mealLabel}</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="infoArrow" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d={downArrow}/>
                        </svg>
                    </div>
                    <InfoMeal />
                </div>
            </div>
        </Draggable>

    );
};

export default InfoMain;