import React, { FC } from "react";

import { MessageChatType } from "../../api/chat-api";

const Message: FC<{ message: MessageChatType }> = React.memo(({ message }) => {
	return (
		<div>
			<img style={{width: '50px'}} src={message.photo}/><b>{message.userName}</b>
			<br/>
			{message.message}
			<hr/>
		</div>
	)
})

export default Message