import { updateObjectInArray } from "../../util/object-helper";
import { BaseThunkType, InferActionsType } from "../store";
import { actions } from "./action-creators";

const initialState = {
	users: [] as Array<UserType>,
	pageSize: 100 as number,
	totalUsersCount: 0 as number,
	currentPage: 1 as number,
	isFetching: true as boolean,
	filter: {
		term: '',
		friend: null as null | boolean,
	},
	followingInProgress: [] as Array<number>, //array of users id
};

export type InitialStateType = typeof initialState;
export type ActionsTypes = InferActionsType<typeof actions>;
export type FilterType = typeof initialState.filter;
export type ThunkActionType = BaseThunkType<ActionsTypes>;

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case "users/FOLLOW":
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {followed: true}),
			}
		case "users/UNFOLLOW":
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
			}
		case "users/SET_USERS":
			return {
				...state,
				users: action.users
			}
		case "users/SET_CURRENT_PAGE":
			return {
				...state, currentPage: action.currentPage
			}
		case "users/SET_TOTAL_USERS_COUNT":
			return {
				...state, totalUsersCount: action.count
			}
		case "users/TOGGLE_IS_FETCHING":
			return {
				...state, isFetching: action.isFetching
			}
		case "users/TOGGLE_FOLLOWING_IN_PROGRESS":
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter(id => id != action.userId)

			}
		case 'users/SET_FILTER':
			return {...state, filter: action.payload}
		default:
			return state
	}
}

export default usersReducer