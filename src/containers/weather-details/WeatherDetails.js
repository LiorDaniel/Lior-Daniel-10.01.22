import react from "react";
import ForecastComponent from "../../components/forecast-component/ForecastComponent";
import SearchEngine from "../../components/search-engine/SearchEngine";

function WeatherDetails() {
    return (
        <>
            <SearchEngine />
            <ForecastComponent />
        </>
    )
}
export default WeatherDetails