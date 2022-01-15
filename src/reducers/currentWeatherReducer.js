import data from './../currentWeather.json'


// a state that sets the current weather in the city displayed in the home screen

const currentWeatherReducer=(state=data[0],action)=>{
    switch(action.type){
    case 'SET_CURRENT_WEATHER':
        return action.payload
 
        default:
            return state
    }
}

export default currentWeatherReducer