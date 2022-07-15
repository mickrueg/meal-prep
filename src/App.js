import './App.css';
import MealPrepMain from './Components/MealPrep/MealPrepMain';
import SearchMain from './Components/Search/SearchMain';
import InfoMain from './Components/Info/InfoMain';

function App() {
  return (
    <div className="App">
        <div className='background-image'></div>
        <div className='background-overlay'></div>
        <MealPrepMain />
        <SearchMain />
        <InfoMain />
    </div>
  );
}

export default App;
