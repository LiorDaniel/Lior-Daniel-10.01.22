import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import './../favorite-city-component/FavoriteCityComponent.css'
import currentWeatherData from './../../currentWeather.json'
import { setCurrentWeather } from "../../actions/setCurrentWeather";
import { setCurrentScreen } from "../../actions/setCurrentScreen";
import { setForecast } from "../../actions/setForecast";
import { setSelected } from "../../actions/setSelected";

function FavoriteCityComponent(props) {

    // internal state, holds the current weather for every favorite-city component
    const [weather, setWeather] = useState(null)
    const apikey = "LCX7tf2nO3zIwA4KZjKSpnwGqyyFoQ2Y"
    const favorites = useSelector(state => state.favorites)
    const isDarkMode = useSelector(state => state.isDarkMode)
    const dispatch = useDispatch()

    useEffect(() => {

        axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${(favorites[props.id].key)}?apikey=${(apikey)}`).then((res) => {
            setWeather(res.data[0])
        })
    }, [])

    /*
        changeHomeDetails
        des: if a favorite city has been clicked, the function sends us back to home screen and 
             sets the displayed city to clicked city.
        params: none
    */
    function changeHomeDetails() {
        dispatch(setCurrentScreen("home"))
        dispatch(setSelected(favorites[props.id]))
    }

    return (
        weather !== null &&
        <div className={`favorite-forecast ${(isDarkMode && `dark-mode-favorite`)}`} onClick={changeHomeDetails}>
            <p className="favorite-city-title">{favorites[props.id].name}</p>
            <div>
                <img className="favorite-forecast-icon" src={`/assets/${(weather.WeatherIcon)}.png`} alt={`${(weather.WeatherText)}`} />
            </div>
            <p className="favorite-details">{weather.Temperature.Imperial.Value}{weather.Temperature.Imperial.Unit}</p>
            <p className={`favorite-icon-phrase ${(isDarkMode && `dark-mode-favorite-icon-phrase`)}`}>{weather.WeatherText}</p>
        </div>
    )
}

export default FavoriteCityComponent