import './App.css';
import MealPrepMain from './Components/MealPrep/MealPrepMain';
import mobileBackground from './assets/mobileBackground.jpg';
import SearchMain from './Components/Search/SearchMain';
import InfoMain from './Components/Info/InfoMain';

function App() {
  return (
    <div className="App">
      <img className='background-image' src={mobileBackground} alt='background'/>
      <MealPrepMain />
      <SearchMain />
      <InfoMain />
    </div>
  );
}

export default App;
