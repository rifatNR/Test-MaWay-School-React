import axios from 'axios';
import React, { createContext, useReducer } from 'react';
import { authReducer } from './AuthReducer';
import setDefaultHeader from '../Utility/SetAxiosDefaultHeader';
export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const initianState = {
        token: localStorage.getItem('maway_token'),
        isAuth: false,
        user: null
    }
    const [state, dispatch] = useReducer(authReducer, initianState)

    const LoadUser = async () => {
        if(localStorage.maway_token){
            setDefaultHeader(localStorage.maway_token)
        }

        try {
            const res = await axios.get('/auth/user')
            console.log(res);
            if(res.data.success)
                dispatch({type: "LOAD_USER", payload: res.data.data})
            else
                console.log(res.data.message);
        } catch (err) {
            console.log(err);
        }
    }

    const Login = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'role': 'school'
            }
        }

        try {
            const res = await axios.post('/auth/login', formData, config)
            console.log(res.data);
            if(res.data.success) {
                dispatch({type: "LOGIN_SUCCESS", payload: res.data})
                LoadUser();
            }
            else
                console.log(res.data.message);
            
        } catch(err) {
            console.log(err);
        }
    }

    const Logout = async () => {
        if(localStorage.maway_token){
            setDefaultHeader(localStorage.maway_token)
        }
        
        try {
            const res = await axios.post('/auth/logout')
            console.log(res.data);
            if(res.data.success)
                dispatch({type: "LOGOUT"})
            else
                console.log(res.data.message);
            
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <AuthContext.Provider 
            value={{
                token: state.token,
                isAuth: state.isAuth,
                user: state.user,
                loading: state.loading,
                Login,
                LoadUser,
                Logout,
            }}>
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;