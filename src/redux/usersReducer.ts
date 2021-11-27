import {userApi} from "../api/api";
import {updateObjectInArray} from "../util/object-helper";
import {AppDispatch} from "./redux-store";

interface InitialStateType {
    users: Array<string>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<any>
}

enum UsersActionEnum {
    FOLLOW = 'users/FOLLOW',
    UNFOLLOW = 'users/UNFOLLOW',
    SET_USERS = 'users/SET-USERS',
    SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE',
    SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT',
    TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING',
    TOGGLE_FOLLOWING_IN_PROGRESS = 'users/TOGGLE_FOLLOWING_IN_PROGRESS'
}

interface FollowAction {
    type: UsersActionEnum.FOLLOW
    userId: string
}

interface UnfollowAction {
    type: UsersActionEnum.UNFOLLOW
    userId: string
}

interface SetUsersAction {
    type: UsersActionEnum.SET_USERS
    users: Array<string>
}

interface SetCurrentPageAction {
    type: UsersActionEnum.SET_CURRENT_PAGE
    currentPage: number
}

interface SetTotalUsersCountAction {
    type: UsersActionEnum.SET_TOTAL_USERS_COUNT
    count: number
}

interface ToggleIsFetchingAction{
    type:UsersActionEnum.TOGGLE_IS_FETCHING
    isFetching:boolean
}
interface ToggleFollowingInProgressAction{
    type:UsersActionEnum.TOGGLE_FOLLOWING_IN_PROGRESS
    isFetching:boolean
    userId:string
}

type UsersAction = FollowAction | UnfollowAction |
    SetUsersAction | SetCurrentPageAction | SetTotalUsersCountAction
    | ToggleIsFetchingAction | ToggleFollowingInProgressAction

let initialState: InitialStateType = {
    users: [],
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
};

const usersReducer = (state = initialState, action:UsersAction): InitialStateType => {
    switch (action.type) {
        case UsersActionEnum.FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case UsersActionEnum.UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case UsersActionEnum.SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case UsersActionEnum.SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case UsersActionEnum.SET_TOTAL_USERS_COUNT:
            return {
                ...state, totalUsersCount: action.count
            }
        case UsersActionEnum.TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case UsersActionEnum.TOGGLE_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)

            }
        default:
            return state
    }
}

export const followSuccess = (userId:string) => ({type: UsersActionEnum.FOLLOW, userId});
export const unFollowSuccess = (userId:string) => ({type: UsersActionEnum.UNFOLLOW, userId})
export const setUsers = (users:Array<string>) => ({type: UsersActionEnum.SET_USERS, users})
export const setCurrentPage = (currentPage:number) => ({type: UsersActionEnum.SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (count:number) => ({type: UsersActionEnum.SET_TOTAL_USERS_COUNT, count})
export const toggleIsFetching = (isFetching:boolean) => ({type: UsersActionEnum.TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingInProgress = (isFetching:boolean, userId:string) => ({
    type: UsersActionEnum.TOGGLE_FOLLOWING_IN_PROGRESS,
    isFetching,
    userId
})

export const getUsers = (currentPage:number, pageSize:number) => async (dispatch:AppDispatch) => {
    dispatch(toggleIsFetching(true))
    let response = await userApi.getUsers1(currentPage, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(response.data.items))
    dispatch(setTotalUsersCount(response.data.totalCount))
}

export const pageChange = (pageNumber:number, pageSize:number) => async (dispatch:AppDispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(pageNumber))
    let response = await userApi.getUsers2(pageNumber, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(response.data.items))
}

const followUnfollow = async (dispatch:AppDispatch, userId:string, apiMethod:any, actionCreator:any) => {
    dispatch(toggleFollowingInProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingInProgress(false, userId))
}

export const follow = (userId:string) => async (dispatch:AppDispatch) => {
    followUnfollow(dispatch, userId, userApi.follow.bind(userId), followSuccess)
}

export const unFollow = (userId:string) => async (dispatch:AppDispatch) => {
    followUnfollow(dispatch, userId, userApi.unfollow.bind(userId), unFollowSuccess)
}

export default usersReducer