import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from "axios";
import results from './results.json'
import WeatherDetails from './containers/weather-details/WeatherDetails';
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentScreen } from './../src/actions/setCurrentScreen'
import { setSelected } from './../src/actions/setSelected'
import { setIsDarkMode } from './actions/setIsDarkMode';
import { setFavorites } from './actions/setFavorites';
import FavoriteCitiesScreen from './containers/favorites-cities-screen/FavoriteCitiesScreen';
function App() {
  const currentScreen = useSelector(state => state.currentScreen)
  const isDarkMode = useSelector(state => state.isDarkMode)
  const dispatch = useDispatch()

  return (
    <div className={`App ${(isDarkMode && `dark-mode-app`)}`}>
      <header className={`header ${(isDarkMode && `dark-mode-header`)}`}>
        <div className='header-title-container'>
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            className="dark-mode-icon"
            onClick={() => { dispatch(setIsDarkMode(!isDarkMode)) }}>
            {
              isDarkMode ?
                <path className="moon-1" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                :
                <>
                  <circle className="sun-1" cx="12" cy="12" r="5"></circle>
                  <line className="sun-1" x1="12" y1="1" x2="12" y2="3"></line>
                  <line className="sun-1" x1="12" y1="21" x2="12" y2="23"></line>
                  <line className="sun-1" x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line className="sun-1" x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line className="sun-1" x1="1" y1="12" x2="3" y2="12"></line>
                  <line className="sun-1" x1="21" y1="12" x2="23" y2="12"></line>
                  <line className="sun-1" x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line className="sun-1" x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </>
            }
          </svg>







          <h1 className='header-title' onClick={() => { dispatch(setCurrentScreen("home")) }}>Weatherolo</h1>
        </div>


        <nav className='nav-bar'><div className={`nav-link ${(currentScreen == "home" ? `current-screen` : ``)}`} onClick={() => { dispatch(setCurrentScreen("home")) }}>Home</div>
          <div className={`nav-link ${(currentScreen == "favorites" ? `current-screen` : ``)}`} onClick={() => { dispatch(setCurrentScreen("favorites")) }}>favorites</div></nav>
      </header>
      {/* <header className="App-header">
       
      </header> */}


      {currentScreen === "home" ?
        <WeatherDetails />
        :
        currentScreen === "favorites" &&

        <FavoriteCitiesScreen />

      }

    </div>
  );
}

export default App;
