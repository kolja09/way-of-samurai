import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";

import { createField } from "../FormControl/FormControl";
import { required } from "../../util/validation/validation";
import Input from "../Input/Input";
import s from "../FormControl/FormControl.module.css";

import { LoginFormValuesKeysType, LoginFormValuesType, LoginOwnFormProps } from "./types";

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginOwnFormProps> & LoginOwnFormProps> =
	({ handleSubmit, error, captchaUrl }) => {
		return (
			<form onSubmit={handleSubmit}>
				{ createField<LoginFormValuesKeysType>('Email', 'email', [required], Input) }
				{ createField<LoginFormValuesKeysType>('Password', 'password', [required], Input, {type: 'password'}) }
				{ createField<LoginFormValuesKeysType>(undefined, 'rememberMe', [], Input, {type: 'checkbox'}, 'rememberMe') }
				{
					error &&
					<div className={s.formControlSummary}>
						{error}
					</div>
				}
				{ captchaUrl && <img src={captchaUrl} alt="captcha"/> }
				{ captchaUrl && createField<LoginFormValuesKeysType>('', 'captcha', [required], Input) }
				<div>
					<button>Login</button>
				</div>
			</form>
		)
	}

//6nS_mrZgxiEBGN7

export const ReduxFormLogin = reduxForm<LoginFormValuesType, LoginOwnFormProps>({ form: 'login' })(LoginForm)
