import { stopSubmit } from "redux-form";

import { profileApi } from "../../api/profile-api";
import { ResultCodeEnum } from "../../api/api";
import { ThunkActionType } from "./profileReducer";

export const actions = {
	addPost: (newPostText: string) => ({type: 'profile/ADD-POST', newPostText} as const),
	setUserProfile: (profile: ProfileType) => ({type: 'profile/SET-USER-PROFILE', profile} as const),
	setStatus: (status: string) => ({type: 'profile/SET_STATUS', status} as const),
	savePhotoSuccess: (photos: PhotosType) => ({type: 'profile/SAVE_PHOTO_SUCCESS', photos} as const),
}

export const getUserProfile = (userId: number): ThunkActionType => async (dispatch) => {
	const data = await profileApi.getProfile(userId)
	dispatch(actions.setUserProfile(data))
}

export const getStatus = (userId: number): ThunkActionType => async (dispatch) => {
	const data = await profileApi.getStatus(userId)
	dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string): ThunkActionType => async (dispatch) => {
	const data = await profileApi.updateStatus(status)
	if (data.resultCode === ResultCodeEnum.Success) {
		dispatch(actions.setStatus(status))
	}
}

export const savePhoto = (file: File): ThunkActionType => async (dispatch) => {
	const data = await profileApi.savePhoto(file)
	if (data.resultCode === ResultCodeEnum.Success) {
		dispatch(actions.savePhotoSuccess(data.data.photos))
	}
}

export const saveProfile = (profile: ProfileType): ThunkActionType => async (dispatch, getState) => {
	const userId = getState().auth.userId;
	const data = await profileApi.saveProfile(profile)
	if (data.resultCode === ResultCodeEnum.Success) {
		if (userId != null) {
			dispatch(getUserProfile(userId))
		} else {
			throw new Error(`userId can't be null`)
		}
	} else {
		dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}))
		return Promise.reject(data.messages[0])
	}
}
