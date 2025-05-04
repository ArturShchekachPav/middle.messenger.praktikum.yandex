import {ChatHeader, ChatMessageForm, ChatMessages, ChatPreview} from "../components/index.js";
import {MESSAGES_DATA} from "./constants.js";

export const createChats = (chatsData, getComponents) => {
	return chatsData.map(({name, avatar, lastTime, lastMessage, unreadMessagesCount}) => new ChatPreview({
		name: name,
		avatar: avatar,
		lastTime: lastTime,
		lastMessage: lastMessage,
		unreadMessagesCount: unreadMessagesCount,
		onClick: () => {
			const {
				currentChat,
				addFilePopup,
				addMediaPopup,
				addUserPopup,
				removeUserPopup
			} = getComponents();

			console.log(getComponents());

			currentChat.setProps({
				content: [
					new ChatHeader({
						name: name,
						avatarSrc: avatar,
						onAddUserButtonClick: () => {
							addUserPopup.open();
						},
						onRemoveUserButtonClick: () => {
							removeUserPopup.open();
						}
					}),
					new ChatMessages({
						dataMessages: MESSAGES_DATA
					}),
					new ChatMessageForm({
						onAddFileButtonClick: () => {
							addFilePopup.open();
						},
						onAddMediaButtonClick: () => {
							addMediaPopup.open();
						}
					})
				]
			})
		},
	}));
}
