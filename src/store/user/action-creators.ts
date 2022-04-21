import { Dispatch } from "redux";

import { userApi } from "../../api/user-api";
import { ActionsTypes, FilterType, ThunkActionType } from "./usersReducer";

export const actions = {
	followSuccess: (userId: number) => ({type: 'users/FOLLOW', userId} as const),
	unFollowSuccess: (userId: number) => ({type: 'users/UNFOLLOW', userId} as const),
	setUsers: (users: Array<UserType>) => ({type: 'users/SET_USERS', users} as const),
	setCurrentPage: (currentPage: number) => ({type: 'users/SET_CURRENT_PAGE', currentPage} as const),
	setTotalUsersCount: (count: number) => ({type: 'users/SET_TOTAL_USERS_COUNT', count} as const),
	setFilter: (filter: FilterType) => ({type: 'users/SET_FILTER', payload: filter} as const),
	toggleIsFetching: (isFetching: boolean) => ({type: 'users/TOGGLE_IS_FETCHING', isFetching} as const),
	toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({
		type: 'users/TOGGLE_FOLLOWING_IN_PROGRESS',
		isFetching,
		userId
	} as const)
}

export const getUsers = (page: number, pageSize: number, filter: FilterType): ThunkActionType => async (dispatch) => {
	dispatch(actions.toggleIsFetching(true))
	dispatch(actions.setCurrentPage(page))
	dispatch(actions.setFilter(filter))
	const data = await userApi.getUsers(page, pageSize, filter.term, filter.friend)
	dispatch(actions.toggleIsFetching(false))
	dispatch(actions.setUsers(data.items))
	dispatch(actions.setTotalUsersCount(data.totalCount))
}

const followUnfollow = async (dispatch: Dispatch<ActionsTypes>, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsTypes) => {
	dispatch(actions.toggleFollowingInProgress(true, userId))
	const data = await apiMethod(userId)
	if (data.resultCode === 0) {
		dispatch(actionCreator(userId))
	}
	dispatch(actions.toggleFollowingInProgress(false, userId))
}

export const follow = (userId: number): ThunkActionType => async (dispatch) => {
	followUnfollow(dispatch, userId, userApi.follow.bind(userId), actions.followSuccess)
}

export const unFollow = (userId: number): ThunkActionType => async (dispatch) => {
	followUnfollow(dispatch, userId, userApi.unfollow.bind(userId), actions.unFollowSuccess)
}
