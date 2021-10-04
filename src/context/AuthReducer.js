export const authReducer = (state, action) => {
    switch(action.type){
        case "LOAD_USER":
            return {
                ...state,
                isAuth: true,
                user: action.payload,
                loading: false
            }
        case "LOGIN_SUCCESS":
            localStorage.setItem('maway_token', action.payload.data.token)
            return {
                ...state,
                isAuth: true,
                loading: false
            }
        case "LOAD_USER_ERROR":
        case "LOGIN_FAIL":
        case "LOGOUT":
            localStorage.removeItem('maway_token')
            return {
                ...state,
                token: null,
                isAuth: false,
                user: null,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}