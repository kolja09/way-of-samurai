export interface IProfileDataForm {
	profile: ProfileType,
}

export type ProfileTypeKey = Extract<keyof ProfileType, string>
