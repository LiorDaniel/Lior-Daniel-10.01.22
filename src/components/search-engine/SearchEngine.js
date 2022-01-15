import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setSearch } from './../../actions/setSearch'
import { setSearchResults } from './../../actions/setSearchResults'
import { setSelected } from "../../actions/setSelected";
import './../search-engine/SearchEngine.css'
import axios from "axios";

function SearchEngine() {
    const apikey = "LCX7tf2nO3zIwA4KZjKSpnwGqyyFoQ2Y"
    const search = useSelector(state => state.search)
    const searchResults = useSelector(state => state.searchResults)
    const isDarkMode = useSelector(state => state.isDarkMode)
    const dispatch = useDispatch()

     /*
      handleChange 
      des:  being called whenever theres a change in the input, and makes an api call in order to retrieve 
            the appropriate city search list
      params: none
    */
    function handleChange(event) {
        dispatch(setSearch(event.target.value))
            axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${(apikey)}&q=${(search)}`).then((res)=>{
          dispatch(setSearchResults(res.data))
        })
    }

     /*
      renderSearchList 
      des:  goes over the searchResults array and returns a list item for every result
      params: none
    */
    function renderSearchList() {
        return searchResults.map((item) =>
            <li className={`search-list-item ${(isDarkMode && `dark-mode-list-item`)}`} key={item.Key} onClick={() => { dispatch(setSelected({ name: item.LocalizedName, key: item.Key })) }}>
                {item.LocalizedName}, {item.Country.LocalizedName}
            </li>)
    }

    return (
        <div className="search-engine">
            <input type="search" value={search} onChange={handleChange} className={`search-input ${(isDarkMode && `dark-mode-input`)}`} placeholder="Search city" />
            {
                search !== "" &&searchResults!=="" &&
                <ul className="search-list">
                    {
                        
                         renderSearchList()
                    }
                   
                </ul>
            }
        </div>
    )
}

export default SearchEngine