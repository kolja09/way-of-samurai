import { InferActionsType } from "../store";
import { actions } from "./action-creators";

const initialState = {
	initialized: false as boolean
};

type ActionsTypes = InferActionsType<typeof actions>;
export type InitialStateType = typeof initialState;

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'app/INITIALIZED_SUCCESS':
			return {
				...state,
				initialized: true
			}
		default:
			return state
	}
}

export default appReducer
