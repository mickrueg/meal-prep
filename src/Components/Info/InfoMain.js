import React, { useContext, useState } from 'react';
import './InfoMain.css';
import InfoMeal from './InfoMeal';
import { InfoContext } from './InfoContext';
import Draggable from 'react-draggable';
import styled from '@emotion/styled';

const downArrow='M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z';

const Box = styled.div`
    transition: ${props=>props.isReleased ? `500ms ease` : `none`}
`;

const InfoMain = () => {
    const nodeRef = React.useRef(null);
    const {infoState, setInfoState, mealLabel, setSearchMain} = useContext(InfoContext);
    const [isReleased, setisReleased] = useState(true);

    const mobileSnap = () =>{
            setisReleased(true)
            setInfoState('InfoContainer');
            setSearchMain(`SearchMain`)
    }

    const resetRelease = () =>{
        setisReleased(false)
    }


    return (
        <Draggable
            nodeRef={nodeRef}
            position={{x:0, y:0}}
            onStart={resetRelease}
            onStop={mobileSnap}
            axis='y'
            handle='#handle'
            >
            <Box className={infoState} ref={nodeRef} isReleased={isReleased}>
                <div className='InfoMain'>
                    <div className='InfoHeader' id="handle">
                        <h1>{mealLabel}</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="infoArrow" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d={downArrow}/>
                        </svg>
                    </div>
                    <InfoMeal />
                </div>
            </Box>
        </Draggable>

    );
};

export default InfoMain;