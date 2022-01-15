import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import FavoriteCityComponent from "../../components/favorite-city-component/FavoriteCityComponent";


function FavoriteCitiesScreen() {
    const favorites = useSelector(state => state.favorites)

     /*
      renderFavorites 
      des:  goes over the favorites array and returns a FacoriteCityComponent for each value
      params: none
    */
    const renderFavorites = () => {
        return favorites.map((day) =>
            <FavoriteCityComponent id={favorites.indexOf(day)} key={favorites.indexOf(day)} />
        )
    }

    return (
        <div className="favorite-cities-container">
            {renderFavorites()}
        </div>
    )
}

export default FavoriteCitiesScreen