import { FormAction } from "redux-form";

import { BaseThunkType, InferActionsType } from "../store";
import { actions } from "./action-creators";

const initialState = {
	posts: [
		{id: 1, message: 'Hi, how are you?', likesCount: 3},
		{id: 2, message: 'It\'s my first post', likesCount: 45},
		{id: 3, message: 'Well done', likesCount: 23},
		{id: 4, message: 'good', likesCount: 16},
	] as Array<PostsType>,
	profile: null as ProfileType | null,
	status: ''
};

export type InitialStateType = typeof initialState;
export type ActionsTypes = InferActionsType<typeof actions>;
export type ThunkActionType = BaseThunkType<ActionsTypes | FormAction>;

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'profile/ADD-POST':
			const text = action.newPostText;
			return {
				...state,
				posts: [...state.posts, {id: 5, message: text, likesCount: 0}],
			}
		case 'profile/SET-USER-PROFILE':
			return {...state, profile: action.profile}
		case 'profile/SET_STATUS':
			return {...state, status: action.status}
		case 'profile/SAVE_PHOTO_SUCCESS':
			return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
		default:
			return state
	}
}

export default profileReducer
