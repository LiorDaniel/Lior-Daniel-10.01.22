
// a state for keeping all favorite cities 


const favoriteCitiesReducer=(state=[],action)=>{
    switch (action.type){
        case 'SET_FAVORITES':
            return action.payload
            default:
                return state
    }
}

export default favoriteCitiesReducer