import searchReducer from "./search";
import selectReducer from "./selected";
import currentScreenReducer from "./currentScreenReducer";
import darkModeReducer from "./isDarkMode";
import currentWeatherReducer from "./currentWeatherReducer";
import forecastResucer from "./forecastReducer";
import favoriteCitiesReducer from "./favoriteCitiesReducer";
import searchResultsReducer from "./searchResultsReducer";
import { combineReducers } from "redux";

const loggerReducer=(state,action)=>{
    return action.type
}

// a reducer that combines all reducers

const allReducers= combineReducers({
    search:searchReducer,
    selected:selectReducer,
    searchResults:searchResultsReducer,
    // logger: loggerReducer,
    currentScreen: currentScreenReducer,
    isDarkMode:darkModeReducer,
    currentWeather:currentWeatherReducer,
    forecast: forecastResucer,
    favorites: favoriteCitiesReducer
})

export default allReducers