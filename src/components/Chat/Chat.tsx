import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { startMessagesListening, stopMessagesListening } from "../../store/chat/action-creators";
import { RootState } from "../../store/store";
import AddMessageForm from "../AddMessageForm/AddMessageForm";
import Messages from "../Messages/Messages";

const Chat: FC = () => {
	let dispatch = useDispatch();

	const status = useSelector((state: RootState) => state.chat.status);

	useEffect(() => {
		dispatch(startMessagesListening())
		return () => {
			dispatch(stopMessagesListening())
		}
	}, []);

	return (
		<div>
			{status === 'error' && <div>Some error occured. Please refresh the page</div>}
			<>
				<Messages/>
				<AddMessageForm/>
			</>
		</div>
	)
}

export default Chat