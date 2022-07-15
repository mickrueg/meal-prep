import './App.css';
import MealPrepMain from './Components/MealPrep/MealPrepMain';
import SearchMain from './Components/Search/SearchMain';
import InfoMain from './Components/Info/InfoMain';
import Background from './Components/Background/Background';
import { useState } from 'react';
import { InfoContext } from './Components/Info/InfoContext';

function App() {
  const [infoState, setInfoState] = useState('InfoContainer');

  return (
    <div className="App">
        <Background />
        <MealPrepMain />
        <InfoContext.Provider value={{infoState,setInfoState}}>
          <SearchMain/>
          <InfoMain />
        </InfoContext.Provider>
    </div>
  );
}

export default App;
