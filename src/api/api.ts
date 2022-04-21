import axios from "axios";

export enum ResultCodeEnum {
	Success = 0,
	Error = 1,
}

export enum ResultCodeWithCaptchaEnum {
	CaptchaIsRequired = 10,
}

export const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: {
		'API-KEY': 'c8bb4e2b-2692-428e-85fb-e1595485b124',
	},
})

export type APIResponseType<D = {}, RS = ResultCodeEnum> = {
	data: D,
	messages: Array<string>,
	resultCode: RS,
}

export type GetUsersType = {
	items: Array<UserType>,
	totalCount: number,
	error: string | null,
}
