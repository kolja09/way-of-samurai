import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import { reducer as formReducer } from "redux-form";
import thunkMiddleware, { ThunkAction } from 'redux-thunk'

import profileReducer from "./profile/profileReducer";
import authReducer from "./auth/authReducer";
import appReducer from "./app/appReducer";
import chatReducer from "./chat/chatReducer";
import usersReducer from "./user/usersReducer";

const rootReducer = combineReducers({
	profilePage: profileReducer,
	usersPage: usersReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer,
	chat: chatReducer
});

type RootReducerType = typeof rootReducer;
export type RootState = ReturnType<RootReducerType>;

export type InferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, RootState, unknown, A>;

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store