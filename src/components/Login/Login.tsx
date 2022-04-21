import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../store/auth/action-creators";
import { Redirect } from "react-router-dom";
import { RootState } from "../../store/store";

import { ReduxFormLogin } from '../LoginForm/LoginForm';

export const Login = () => {
	const dispatch = useDispatch();

	const onSubmit = (formData: any) => {
		dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
	};

	const isAuth = useSelector((state: RootState) => state.auth.isAuth);
	const captchaUrl = useSelector((state: RootState) => state.auth.captchaUrl);

	if (isAuth) return <Redirect to='/profile'/>

	return (
		<div>
			<h1>Login</h1>
			<ReduxFormLogin captchaUrl={captchaUrl} onSubmit={onSubmit}/>
		</div>
	);
};
