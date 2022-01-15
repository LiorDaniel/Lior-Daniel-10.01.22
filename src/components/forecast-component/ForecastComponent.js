import react, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setForecast } from './../../actions/setForecast'
import { setFavorites } from "./../../actions/setFavorites"
import { setCurrentWeather } from "../../actions/setCurrentWeather";
import './../forecast-component/ForecastComponent.css'
import axios from "axios";

function ForecastComponent() {
  const apikey="LCX7tf2nO3zIwA4KZjKSpnwGqyyFoQ2Y"
  const forecast = useSelector(state => state.forecast)
  const selectedCity = useSelector(state => state.selected)
  const currentWeather = useSelector(state => state.currentWeather)
  const favorites = useSelector(state => state.favorites)
  const isDarkMode = useSelector(state => state.isDarkMode)
  const dispatch = useDispatch()

  /*
    addToFavorites
    des:  checks if the current displayed city is on the favorites list, and puts it there if not.
    params: none
  */
  function addToFavorites() {
    let isFound = false

    //checks if the city exist in the array
    for (let index = 0; index < favorites.length; index++) {
      if (selectedCity === favorites[index]) {
        isFound = true;
      }
    }

    //if the city was not found we add it to the array
    if (isFound === false) {
      dispatch(setFavorites([...favorites, selectedCity]))
    }
    
  }

  /*
    removeFromFavorites
    des:  removes the displayed city from the favorites list
    params: none
  */
  function removeFromFavorites() {
    dispatch(setFavorites(favorites.filter((city) => { return city.name !== selectedCity.name })))
    localStorage.setItem("favorites", favorites)
  }


  /*
    dateConverter
    des:  converts the date from iso and return the specific day name
    params: recieves a day object which is a value in the forecast array
  */
  function dateConverter(day) {
    const event = new Date(day.Date);
    const newDate = event.toString();
    return (
      newDate.slice(0, 3)
    )
  }

  /*
   useEffect 
   des:  makes an api call to retrieve the 5-day forecast and current weather of the selected city.
   params: being called whenever thre is a change in the selected city state
*/
  useEffect(() => {
    axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${selectedCity.key}?apikey=${(apikey)}`).then((res) => {
      dispatch(setForecast(res.data.DailyForecasts))
    })
    axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${selectedCity.key}?apikey=${(apikey)}`).then((res) => {
      dispatch(setCurrentWeather(res.data[0]))
    })
  }, [selectedCity])


  /*
       renderForecat 
       des:  goes over the forecast array and returns html for every value on the array
       params: none
   */
  const renderForecast = () => {
    return forecast.map((day) =>
      <div className={`daily-forecast ${(isDarkMode && `dark-mode-dailies`)}`} key={forecast.indexOf(day)}>
        <p className="day-name">{dateConverter(day)}</p>
        <img className="daily-forecast-icon" src={`/assets/${(day.Day.Icon)}.png`} alt={`${(day.Day.IconPhrase)}`} />
        <p className="daily-details">{(day.Temperature.Minimum.Value + day.Temperature.Maximum.Value) / 2}{day.Temperature.Minimum.Unit}</p>
        <p className={`icon-phrase ${(isDarkMode && `dark-mode-icon-phrase`)}`}>{day.Day.IconPhrase}</p>
      </div>
    )
  }


  return (
    <div className={`all-forecast-container ${(isDarkMode && `dark-mode-all-forecast`)}`}>
      <div className="current-forecast-details">
        <div className="current-forecast-left">
          <img className="current-forecast-icon" src={`/assets/${(currentWeather.WeatherIcon)}.png`} alt={`${(currentWeather.WeatherText)}`} />
          <div className="current-forecast-text">
            <p>{selectedCity.name}</p>
          </div>
        </div>
        {currentWeather !== "undefind" &&
          <div className="current-forecast-middle">
            <p>{currentWeather.Temperature.Imperial.Value}{currentWeather.Temperature.Imperial.Unit}</p>
            <p>{currentWeather.WeatherText}</p>
          </div>
        }
        <div className="current-forecast-right">
          <svg
            viewBox="0 0 297.44 259.34"
            className={`heart-icon ${(isDarkMode && `dark-mode-heart-icon`)}`}
            onClick={() => { if (favorites.includes(selectedCity)) { removeFromFavorites() } else { addToFavorites() } }}
          >
            <g id="Layer_1-2" data-name="Layer 1">
              <path
                className={`heart-icon-1  ${(favorites.includes(selectedCity) ? (isDarkMode ? `full-heart-dark-mode` : `full-heart`) : `empty-heart`)}`}
                d="M260,19.4A76.7,76.7,0,0,0,211.13,2.07,78,78,0,0,0,156,24.77a79.28,79.28,0,0,0-7.22,8.4A77.47,77.47,0,0,0,73.15,3.23c-24,4.35-42.81,17.54-56,39.16-18.58,30.5-20.09,59.91-4.49,87.44,8.35,14.76,19.18,29.11,33.07,43.86,25.49,27.1,55.66,52.83,95,81a13.61,13.61,0,0,0,8,2.66,14.13,14.13,0,0,0,8.67-3.25c35-25,63.65-49,87.68-73.5,13.61-13.86,29-30.89,40.33-52.15,4.83-9.1,10.35-21.33,10-35.31C294.71,63.05,282.78,38.25,260,19.4Z"
              />
            </g>
          </svg>
        </div>
      </div>
      <div className="weekly-forecast-container">
        {renderForecast()}
      </div>
    </div>
  )
}

export default ForecastComponent