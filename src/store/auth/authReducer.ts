import { FormAction } from "redux-form";

import { BaseThunkType, InferActionsType } from "../store";
import { actions } from "./action-creators";

const initialState = {
	email: null as string | null,
	userId: null as (number | null),
	login: null as string | null,
	isAuth: false as boolean,
	captchaUrl: null as string | null
};

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsType<typeof actions>;
export type ThunkActionType = BaseThunkType<ActionsTypes | FormAction>;

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'auth/SET_AUTH_ME':
		case 'auth/GET_CAPTCHA_SUCCESS':
			return {
				...state,
				...action.payload,
			}
		default:
			return state
	}
}

export default dialogsReducer


