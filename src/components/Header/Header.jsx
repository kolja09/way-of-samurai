import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = ({isAuth, login, logout}) => {
    return <header className={s.header}>
        <img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' alt='logo'/>
        {
            isAuth
                ? <div>{login} - <button onClick={logout}>Logout</button></div>
                : <div className={s.blockLogin}>
                    <NavLink to='/login'>Login</NavLink>
                </div>
        }
    </header>
}

export default Header;