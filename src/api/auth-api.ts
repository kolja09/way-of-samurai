import {APIResponseType, instance, ResultCodeEnum, ResultCodeWithCaptchaEnum} from "./api";

interface GetAuthDataType {
	id: number,
	email: string,
	login: string,
}

interface LoginResponseDataType {
	userId: number,
}

export const authApi = {
	getAuth() {
		return instance.get<APIResponseType<GetAuthDataType>>(`auth/me`).then(res => res.data)
	},
	login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
		return instance.post<APIResponseType<LoginResponseDataType, ResultCodeEnum | ResultCodeWithCaptchaEnum>>
		(`auth/login`, {email, password, rememberMe, captcha}).then(res => res.data)
	},
	logout() {
		return instance.delete(`auth/login`).then(res => res.data)
	}
}