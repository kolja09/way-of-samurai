import { getAuth } from "../auth/action-creators";
import { ThunkActionType } from "../auth/authReducer";

export const actions = {
	initializedSuccess: () => ({type: 'app/INITIALIZED_SUCCESS'} as const),
}

export const initializedApp = (): ThunkActionType => async (dispatch) => {
	const promise = await dispatch(getAuth())
	Promise.all([promise]).then(() => {
		dispatch(actions.initializedSuccess())
	})
}