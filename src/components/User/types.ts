export interface IUser {
	user: UserType,
	follow: (userId: number) => void,
	unFollow: (userId: number) => void,
	followingInProgress: Array<number>,
}