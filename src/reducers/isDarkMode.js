
// a state that saves whether DarkMode is on


const darkModeReducer=(state=false,action)=>{
    switch (action.type){
        case 'SET_IS_DARK_MODE':
            return !state
            default:
                return state
    }
}

export default darkModeReducer