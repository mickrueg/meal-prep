import React from 'react';
import InfoList from './InfoList';
import './InfoMain.css';
import InfoMeal from './InfoMeal';

const InfoMain = () => {
    return (
        <div className='InfoContainer'>
            <div className='InfoMain'>
                <h1>Info Main</h1>
                <InfoMeal />
                <InfoList />
            </div>
        </div>
    );
};

export default InfoMain;