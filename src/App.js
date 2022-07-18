import './App.css';
import MealPrepMain from './Components/MealPrep/MealPrepMain';
import SearchMain from './Components/Search/SearchMain';
import InfoMain from './Components/Info/InfoMain';
import Background from './Components/Background/Background';
import { useState } from 'react';
import { InfoContext } from './Components/Info/InfoContext';

function App() {
  const [infoState, setInfoState] = useState('InfoContainer');
  const [mealImage, setMealImage] = useState();
  const [mealLabel, setMealLabel] = useState();
  const [mealIngredients, setMealIngredients] = useState([]);
  const [mealIngrQuantities, setMealIngrQuantities] = useState();
  const [mealSelected, setMealSelected] = useState();
  const [searchKeyword, setSearchKeyword] = useState();
  const [mealType, setMealType] = useState('all');

  return (
    <div className="App">
        <Background />
        <MealPrepMain />
        <InfoContext.Provider value={
          {infoState, setInfoState,
          mealImage, setMealImage,
          mealLabel, setMealLabel,
          mealIngredients, setMealIngredients,
          mealIngrQuantities,setMealIngrQuantities,
          mealSelected, setMealSelected,
          searchKeyword, setSearchKeyword,
          mealType, setMealType}
        }>
          <SearchMain/>
          <InfoMain />
        </InfoContext.Provider>
    </div>
  );
}

export default App;
