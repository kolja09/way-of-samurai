import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = ({ sidebar }) => {
    return <nav className={s.nav}>
        {
            sidebar.map(link => (
                <div key={link.id} className={s.item}>
                    <NavLink  to={link.path} activeClassName={s.active}>{link.name}</NavLink>
                </div>
            ))
        }
    </nav>
}

export default Navbar;