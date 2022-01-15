
// a state that containes the name and key number for the city displayed in home screen


const selectReducer=(state={name:"Tel-Aviv", key:"215854"},action)=>{
    switch(action.type){
    case 'SET_SELECTED':
        return action.payload

        default:
            return state
    }
}

export default selectReducer