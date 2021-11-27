import React from 'react';
import s from './Dialogs.module.css'
import DialogsItem from "./DialogsItem/DialogsItem";
import Messages from "./Messages/Messages";
import {Field, reduxForm} from "redux-form";
import {MaxLengthsCreator, required} from "../../util/validation/validation";
import {createField, Textarea} from "../common/FormControl/FormControl";

const Dialogs = ({dialogsPage, addMessage}) => {
    let state = dialogsPage;

    const addNewMessage = (value) => {
        addMessage(value.newMessageText)
    }

    return (
        <div>
            <div className={s.dialogs}>
                <div className={s.usersItems}>
                    {state.dialogs.map(d => (<DialogsItem name={d.name} id={d.id} key={d.id}/>))}
                </div>
                <div className={s.messages}>
                    {state.messages.map(m => (
                        <Messages text={m.message} id={m.id} key={m.id}/>
                    ))}
                </div>
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>

    );
};

let maxLengths = MaxLengthsCreator(300)

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.pushMessage}>
            {createField('Enter your message', 'newMessageText', [required, maxLengths], Textarea)}
            <div>
                <button>Add message</button>
            </div>
        </form>
    )
}
const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)


export default Dialogs;