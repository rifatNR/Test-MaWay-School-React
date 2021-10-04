import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

const Login = (props) => {

    const authContext = useContext(AuthContext)
    const {isAuth} = authContext;

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        if(isAuth){
            props.history.push('/dashboard')
        }

        //eslint-disable-next-line
    }, [isAuth, props.history])

    const onChange = (e) => {setUserData({...userData, [e.target.name]: e.target.value})}

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(userData);
        authContext.Login(userData)
    }
    
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <input type="email" name="email" value={userData.email} onChange={onChange}/><br />
                <input type="password" name="password" value={userData.namepassword} onChange={onChange}/><br />
                <input type="submit" value="Log In"/>
            </form>
        </div>
    )
}

export default Login
