import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store/store";
import { sendMessage } from "../../store/chat/action-creators";

const AddMessageForm: FC = () => {
	const dispatch = useDispatch();

	const [message, setMessage] = useState('');

	const status = useSelector((state: RootState) => state.chat.status);

	const sendMessageHandler = () => {
		if (!message) {
			return;
		}
		dispatch(sendMessage(message))
		setMessage('')
	};

	return (
		<div>
			<div>
				<textarea
					onChange={(e) => setMessage(e.currentTarget.value)}
					value={message}>
				</textarea>
			</div>
			<div>
				<button
					disabled={status !== 'ready'}
					onClick={sendMessageHandler}>Send
				</button>
			</div>
		</div>
	)
}

export default AddMessageForm