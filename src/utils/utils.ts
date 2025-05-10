import {ChatPreview} from "../components/index";
import Controllers from "../controllers";

const controller = new Controllers();

export const createChats = (
	chatsData: Array<{
		name: string,
		avatar: string,
		lastTime: string,
		lastMessage: string,
		unreadMessagesCount: string
	}>
) => {
	return chatsData.map(({name, avatar, lastTime, lastMessage, unreadMessagesCount}) => new ChatPreview({
		name: name,
		avatar: avatar,
		lastTime: lastTime,
		lastMessage: lastMessage,
		unreadMessagesCount: unreadMessagesCount,
		onClick: () => {
			controller.emit('setCurrentChat', {name, avatar})
		},
	}));
}
