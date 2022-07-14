import './App.css';
import MealPrepMain from './Components/MealPrep/MealPrepMain';
import mobileBackground from './assets/mobileBackground.jpg';
import SearchMain from './Components/Search/SearchMain';

function App() {
  return (
    <div className="App">
      <img className='background-image' src={mobileBackground} alt='background'/>
      <MealPrepMain />
      <SearchMain />
    </div>
  );
}

export default App;
