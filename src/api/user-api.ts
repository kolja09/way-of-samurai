import { APIResponseType, GetUsersType, instance } from "./api";

export const userApi = {
	getUsers(currentPage = 1, pageSize: number, term: string = '', friend: null | boolean) {
		return instance.get<GetUsersType>
		(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
			.then(res => res.data)
	},
	follow(id: number) {
		return instance.post<APIResponseType>(`follow/${id}`, {}).then(res => res.data)
	},
	unfollow(id: number) {
		return instance.delete(`follow/${id}`).then(res => res.data) as Promise<APIResponseType>
	}
}