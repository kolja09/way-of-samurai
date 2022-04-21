import { Dispatch } from "redux";

import { chatApi, MessageChatType, StatusType } from "../../api/chat-api";
import { ThunkActionType } from "./chatReducer";

export const actions = {
	messagesReceived: (messages: MessageChatType[]) =>
		({type: 'chat/MESSAGE_RECEIVED', payload: { messages }} as const),
	statusChanged: (status: StatusType) => ({type: 'chat/STATUS_CHANGED', payload: { status }} as const)
}

let _newMessageHandler: ((messages:MessageChatType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch:Dispatch) => {
	if(_newMessageHandler === null){
		_newMessageHandler = (messages) => {
			dispatch(actions.messagesReceived(messages))
		}
	}
	return _newMessageHandler
}

let _newStatusChanged: ((status:StatusType) => void) | null = null

const newStatusChangedCreator = (dispatch:Dispatch) => {
	if(_newStatusChanged === null){
		_newStatusChanged = (status) => {
			dispatch(actions.statusChanged(status))
		}
	}
	return _newStatusChanged
}

export const startMessagesListening = (): ThunkActionType => async (dispatch) => {
	chatApi.start()
	chatApi.subscribe("messages-received", newMessageHandlerCreator(dispatch))
	chatApi.subscribe("status-changed", newStatusChangedCreator(dispatch))
}

export const stopMessagesListening = (): ThunkActionType => async (dispatch) => {
	chatApi.unsubscribe("messages-received", newMessageHandlerCreator(dispatch))
	chatApi.unsubscribe("status-changed", newStatusChangedCreator(dispatch))
	chatApi.stop()
}

export const sendMessage = (message:string): ThunkActionType => async (dispatch) => {
	chatApi.sendMessages(message)
}