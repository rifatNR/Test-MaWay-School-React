import React, { useContext, useEffect } from 'react'
import { Fragment } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {

    const authContext = useContext(AuthContext);
    const { isAuth, user, LoadUser, Logout } = authContext

    useEffect(() => {
        LoadUser();
        // eslint-disable-next-line
    }, [])

    const onLogout = () => {
        Logout();
    }

    const GuestLinks = (
        <Fragment>
            <li><Link to='/random_page'>Random</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </Fragment>
    )
    const AuthenticatedLinks = (
        <Fragment>
            <li><Link to='/dashboard'>Dashboard</Link></li>
            <li>
                👤 {user && user.user_name}
            </li>
            <li>
                <a onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-alt" />{" "}
                    <span className="">Logout</span>
                </a>
            </li>
        </Fragment>
    )
    
    return (
        <div>
            <ul>
                {/* <li><Link to='/'>Home</Link></li> */}
                {isAuth ? AuthenticatedLinks : GuestLinks}
            </ul>
        </div>
    )
}

export default Navbar
