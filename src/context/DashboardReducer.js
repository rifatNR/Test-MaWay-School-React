export const dashboardReducer = (state, action) => {
    switch(action.type){
        case "LOAD_DASHBOARD":
            return {
                ...state,
                isAuth: true,
                user: action.payload,
                loading: false
            }
        default:
            return state
    }
}