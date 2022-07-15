import React, { useContext } from 'react';
import InfoList from './InfoList';
import './InfoMain.css';
import InfoMeal from './InfoMeal';
import { InfoContext } from './InfoContext';

const InfoMain = () => {
    const {infoState} = useContext(InfoContext);
    return (
        <div className={infoState}>
            <div className='InfoMain'>
                <h1>Info Main</h1>
                <InfoMeal />
                <InfoList />
            </div>
        </div>
    );
};

export default InfoMain;