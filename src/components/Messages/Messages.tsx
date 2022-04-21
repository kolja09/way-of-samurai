import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store/store";

import Message from "../Message/Message";

const Messages: FC = () => {
	const [isAutoScroll, setIsAutoScroll] = useState(true);
	const messagesAnchorRef = useRef<HTMLDivElement>(null);

	const messages = useSelector((state: RootState) => state.chat.messages);

	const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
		const element = e.currentTarget
		if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
			!isAutoScroll && setIsAutoScroll(true)
		} else {
			isAutoScroll && setIsAutoScroll(false)
		}
	};

	useEffect(() => {
		if (isAutoScroll) {
			messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
		}
	}, [messages]);

	return (
		<div style={{height: '400px', overflow: "auto"}} onScroll={scrollHandler}>
			{messages.map((m) => ( <Message key={m.id} message={m}/> ))}
			<div ref={messagesAnchorRef}> </div>
		</div>
	)
}

export default Messages