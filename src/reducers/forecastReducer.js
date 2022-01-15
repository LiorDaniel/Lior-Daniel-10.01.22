
// a state which holds the 5 day forecast for the city displayed in the home screen


const forecastResucer=(state=[],action)=>{
    switch (action.type){
        case 'SET_FORECAST':
            return action.payload
            default:
                return state
    }
}

export default forecastResucer