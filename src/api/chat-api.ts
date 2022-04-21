export interface MessageChatType {
	message: string,
	photo: string,
	userId: number,
	userName: string,
}

const subscribes = {
	'messages-received': [] as MessagesReceivedSubscribeType[],
	'status-changed': [] as StatusChangedSubscribeType[]
};

type EventNames = 'messages-received' | 'status-changed';

let ws: WebSocket | null = null;

const closeHandler = () => {
	subscribes["status-changed"].forEach(s => s('pending'))
	setTimeout(createChanel, 3000)
};

const messageHandler = (e: MessageEvent) => {
	const newMessage = JSON.parse(e.data)
	subscribes["messages-received"].forEach(s => s(newMessage))
};

const openHandler = () => {
	subscribes["status-changed"].forEach(s => s('ready'))
};

const errorHandler = () => {
	subscribes["status-changed"].forEach(s => s('error'))
	console.error('Refresh page')
};

function createChanel() {
	ws?.removeEventListener('close', closeHandler)
	ws?.removeEventListener('message', messageHandler)
	ws?.removeEventListener('open', openHandler)
	ws?.removeEventListener('error', errorHandler)
	ws?.close()
	ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
	subscribes["status-changed"].forEach(s => s('pending'))
	ws.addEventListener('close', closeHandler)
	ws.addEventListener('message', messageHandler)
	ws.addEventListener('open', openHandler)
	ws.addEventListener('error', errorHandler)
}

export const chatApi = {
	start() {
		createChanel()
	},
	stop() {
		subscribes["messages-received"] = []
		subscribes['status-changed'] = []
		ws?.removeEventListener('close', closeHandler)
		ws?.removeEventListener('message', messageHandler)
		ws?.removeEventListener('open', openHandler)
		ws?.removeEventListener('error', errorHandler)
		ws?.close()
	},
	subscribe(eventName: EventNames, callback: MessagesReceivedSubscribeType | StatusChangedSubscribeType) {
		// @ts-ignore
		subscribes[eventName].push(callback)
		return () => {
			// @ts-ignore
			subscribes[eventName] = subscribes[eventName].filter(s => s !== callback)
		}
	},
	unsubscribe(eventName: EventNames, callback: MessagesReceivedSubscribeType | StatusChangedSubscribeType) {
		// @ts-ignore
		subscribes[eventName] = subscribes[eventName].filter(s => s !== callback)
	},
	sendMessages(message: string) {
		ws?.send(message)
	}
}
export type StatusType = 'pending' | 'ready' | 'error'
type MessagesReceivedSubscribeType = (message: MessageChatType[]) => void
type StatusChangedSubscribeType = (status: StatusType) => void
