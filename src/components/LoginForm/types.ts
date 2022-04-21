export interface LoginOwnFormProps {
	captchaUrl: string | null,
}

export interface LoginFormValuesType {
	email: string,
	password: string,
	rememberMe: string,
	captcha: string,
}

export type LoginFormValuesKeysType = Extract<keyof LoginFormValuesType, string>