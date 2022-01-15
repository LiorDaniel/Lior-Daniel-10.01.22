
// a state that containes the search in the search box. displayes the searchlist accordingly


const searchReducer=(state='Tel Aviv',action)=>{
    switch(action.type){
    case 'SET_SEARCH':
        return action.payload

        default:
            return state
    }
}

export default searchReducer