import {authApi, securityApi} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_ME = 'auth/SET_AUTH_ME';
const GET_CAPTCHA_SUCCESS = 'auth/GET_CAPTCHA_SUCCESS';

let initialState = {
    email: null,
    userId: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_ME:
        case GET_CAPTCHA_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

export const setAuthMe = (userId, email, login, isAuth) => ({type: SET_AUTH_ME, payload: {userId, email, login, isAuth}});
export const getCaptchaSuccess = (captchaUrl) => ({type:GET_CAPTCHA_SUCCESS, payload: {captchaUrl}})

export const getAuth = () => async (dispatch) => {
    let response = await authApi.getAuth()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthMe(id, email, login, true))
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authApi.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuth())
    }else if(response.data.resultCode === 10){
        dispatch(getCaptcha())
    }
    else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logout = () => async (dispatch) => {
    let response = await authApi.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthMe(null, null, null, false))
    }
}

export const getCaptcha = () => async (dispatch) => {
    let response = await securityApi.getCaptcha()
    dispatch(getCaptchaSuccess(response.data.url))
}
export default dialogsReducer