export interface IProfileStatus {
	status: string,
	updateStatus: (newStatus: string) => void,
}

export interface IState {
	status: string,
	editMode: boolean,
}