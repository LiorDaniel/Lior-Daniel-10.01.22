
//a state for checking on what screen are we currently in


const currentScreenReducer=(state="home",action)=>{
    switch(action.type){
    case 'SET_CURRENT_SCREEN':
        return action.payload
 
        default:
            return state
    }
}

export default currentScreenReducer