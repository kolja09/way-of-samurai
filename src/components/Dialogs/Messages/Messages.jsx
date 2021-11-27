import React from "react";
import s from "./../Dialogs.module.css";

const Messages = ({text}) => {
    return (
        <div className={s.message}>{text}</div>
    )
};

export default Messages