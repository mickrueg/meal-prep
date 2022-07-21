import './App.css';
import MealPrepMain from './Components/MealPrep/MealPrepMain';
import SearchMain from './Components/Search/SearchMain';
import InfoMain from './Components/Info/InfoMain';
import Background from './Components/Background/Background';
import { useState } from 'react';
import { InfoContext } from './Components/Info/InfoContext';

function App() {
  const [infoState, setInfoState] = useState('InfoContainer');
  const [searchContainerState, setSearchContainerState] = useState('SearchContainer');
  const [mealImage, setMealImage] = useState();
  const [mealLabel, setMealLabel] = useState();
  const [mealIngredients, setMealIngredients] = useState([]);
  const [mealRecipe, setMealRecipe] = useState();
  const [searchKeyword, setSearchKeyword] = useState();
  const [mealType, setMealType] = useState('all');
  const [searchMain, setSearchMain] = useState('SearchMain');
  const [mainImages, setMainImages] = useState([]);
  const [mainRecipes, setMainRecipes] = useState([]);
  const [mainIngredients, setMainIngredients] = useState([]);
  const [mainIngredientsOrganized, setMainIngredientsOrganized] = useState([]);
  const [exportState, setExportState] = useState('greenButton');
  const [exportText, setExportText] = useState('save to clipboard');

  return (
    <div className="App">
        <Background />
        <InfoContext.Provider value={
          {infoState, setInfoState,
          searchContainerState, setSearchContainerState,
          mealImage, setMealImage,
          mealLabel, setMealLabel,
          mealIngredients, setMealIngredients,
          mealRecipe, setMealRecipe,
          searchKeyword, setSearchKeyword,
          mealType, setMealType,
          searchMain, setSearchMain,
          mainImages, setMainImages,
          mainRecipes, setMainRecipes,
          mainIngredients, setMainIngredients,
          mainIngredientsOrganized, setMainIngredientsOrganized,
          exportState, setExportState,
          exportText, setExportText }
        }>
          <MealPrepMain />
          <SearchMain/>
          <InfoMain />
        </InfoContext.Provider>
    </div>
  );
}

export default App;
