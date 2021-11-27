import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input} from "../common/FormControl/FormControl";
import {required} from "../../util/validation/validation";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import s from './../../components/common/FormControl/FormControl.module.css'

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email','email', [required], Input)}
            {createField('Password','password', [required], Input, {type:'password'})}
            {createField(null,'rememberMe', [], Input, {type:'checkbox'},'rememberMe')}
            {error && <div className={s.formControlSummary}>
                {error}
            </div>}
            {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
                { captchaUrl && createField('','captcha', [required], Input)}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

//6nS_mrZgxiEBGN7

let ReduxFormLogin = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if(props.isAuth) return <Redirect to='/profile' />
    return (
        <div>
            <h1>Login</h1>
            <ReduxFormLogin captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect(mapStateToProps, {login})(Login);