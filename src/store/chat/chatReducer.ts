import { FormAction } from "redux-form";
import { v1 } from 'uuid';

import { BaseThunkType, InferActionsType } from "../store";
import { MessageChatType, StatusType } from "../../api/chat-api";
import { actions } from "./action-creators";

type ChatMessage = MessageChatType & { id: string };
const initialState = {
	messages: [] as ChatMessage[],
	status: 'pending' as StatusType,
}

export type InitialStateType = typeof initialState;
export type ActionsTypes = InferActionsType<typeof actions>;
export type ThunkActionType = BaseThunkType<ActionsTypes | FormAction>;

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'chat/MESSAGE_RECEIVED':
			return {
				...state,
				messages: [...state.messages, ...action.payload.messages.map(m => ({
					...m,
					id: v1()
				}))].filter((m, index, array) => index >= array.length - 100)
			}
		case 'chat/STATUS_CHANGED':
			return {...state, status: action.payload.status}
		default:
			return state
	}
}

export default chatReducer


