
import './MealPrepMain.css';
import MealPrepMeals from './MealPrepMeals';
import EdamamBadge from '../../assets/Edamam_Badge.svg'


const MealPrepMain = () => {

    return (
        <div className='MealPrepContainer'>
            <div className='MealPrepMain'>
                <div className='MealPrepHeader'>
                    <h1>Meal Prep</h1>
                    <a href='https://www.edamam.com/' target="_blank" rel="noopener noreferrer">
                        <img className="Edamam" src={EdamamBadge} alt='Powered by Edamam' />
                    </a>
                </div>
                <hr></hr>
                <MealPrepMeals />
            </div>
        </div>
    );
};

export default MealPrepMain;