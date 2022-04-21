declare interface UserType {
	id: number,
	name: string,
	status: string,
	photos: PhotosType,
	followed: boolean,
}

declare interface PostsType {
	id: number,
	message: string,
	likesCount: number,
}

declare interface ContactsType {
	github: string,
	vk: string,
	facebook: string,
	instagram: string,
	twitter: string,
	website: string,
	youtube: string,
	mainLink: string,
}

declare interface PhotosType {
	small: string | null,
	large: string | null,
}

declare interface ProfileType {
	userId: number,
	lookingForAJob: boolean,
	lookingForAJobDescription: string,
	fullName: string,
	contacts: ContactsType,
	photos: PhotosType,
	aboutMe: string,
}