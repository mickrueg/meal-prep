import './App.css';
import MealPrepMain from './Components/MealPrep/MealPrepMain';
import SearchMain from './Components/Search/SearchMain';
import InfoMain from './Components/Info/InfoMain';
import Background from './Components/Background/Background';

function App() {

  return (
    <div className="App">
        <Background />
        <MealPrepMain />
        <SearchMain />
        {/* <InfoMain /> */}
    </div>
  );
}

export default App;
