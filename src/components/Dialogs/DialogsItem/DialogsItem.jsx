import React from 'react'
import s from "./../Dialogs.module.css";
import {NavLink} from "react-router-dom";

const DialogsItem = ({name, id}) => {
    let path = `/dialogs/${id}`
    return (
        <div className={s.user}>
            <NavLink activeClassName={s.active} to={path}>{name}</NavLink>
        </div>
    )
};

export default DialogsItem