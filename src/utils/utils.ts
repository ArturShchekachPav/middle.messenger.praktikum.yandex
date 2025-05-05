import {ChatHeader, ChatMessageForm, ChatMessages, ChatPreview, Popup } from "../components/index";
import {MESSAGES_DATA} from "./constants";
import Component from "../framework/Component";



export const createChats = (
	chatsData : Array<{
		name: string,
		avatar: string,
		lastTime: string,
		lastMessage: string,
		unreadMessagesCount: number
	}>,
	getComponents: () => {
		currentChat: Component,
		addFilePopup: Popup,
		addMediaPopup: Popup,
		addUserPopup: Popup,
		removeUserPopup: Popup
	}
) => {
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
