export type IProfileInfo = {
	profile: ProfileType | null,
	status: string,
	updateStatus: (status: string) => void,
	savePhoto: (file: File) => void,
	saveProfile: (profile: ProfileType) => Promise<any>,
	isOwner: boolean,
}