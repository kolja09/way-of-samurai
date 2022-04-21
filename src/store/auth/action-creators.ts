import { stopSubmit } from "redux-form";

import { authApi } from "../../api/auth-api";
import { ResultCodeEnum, ResultCodeWithCaptchaEnum } from "../../api/api";
import { securityApi } from "../../api/security-api";
import { ThunkActionType } from "./authReducer";

export const actions = {
	setAuthMe: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
		({type: 'auth/SET_AUTH_ME', payload: {userId, email, login, isAuth}} as const),
	getCaptchaSuccess: (captchaUrl: string) => ({type: 'auth/GET_CAPTCHA_SUCCESS', payload: {captchaUrl}} as const),
}

export const getAuth = (): ThunkActionType => async (dispatch) => {
	const meData = await authApi.getAuth()
	if (meData.resultCode === ResultCodeEnum.Success) {
		const {id, email, login} = meData.data
		dispatch(actions.setAuthMe(id, email, login, true))
	}
}

export const login = (
	email: string,
	password: string,
	rememberMe: boolean,
	captcha: null | undefined
): ThunkActionType => async (dispatch) => {
	const logData = await authApi.login(email, password, rememberMe, captcha)
	if (logData.resultCode === ResultCodeEnum.Success) {
		dispatch(getAuth())
	} else if (logData.resultCode === ResultCodeWithCaptchaEnum.CaptchaIsRequired) {
		dispatch(getCaptcha())
	} else {
		const message = logData.messages.length > 0 ? logData.messages[0] : 'Some error';
		dispatch(stopSubmit('login', {_error: message}))
	}
}

export const logout = (): ThunkActionType => async (dispatch) => {
	const response = await authApi.logout()
	if (response.resultCode === ResultCodeEnum.Success) {
		dispatch(actions.setAuthMe(null, null, null, false))
	}
}

export const getCaptcha = (): ThunkActionType => async (dispatch) => {
	const data = await securityApi.getCaptcha()
	dispatch(actions.getCaptchaSuccess(data.url))
}