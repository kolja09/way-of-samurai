import { instance } from "./api";

interface GetCaptchaType {
	url: string,
}

export const securityApi = {
	getCaptcha() {
		return instance.get<GetCaptchaType>('/security/get-captcha-url').then(res => res.data)
	}
}