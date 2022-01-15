import searchResultsData from './../results.json'

// a state that containes the search results according to the search word

const searchResultsReducer=(state=[],action)=>{
    switch(action.type){
    case 'SET_SEARCH_RESULTS':
        return action.payload

        default:
            return state
    }
}

export default searchResultsReducer