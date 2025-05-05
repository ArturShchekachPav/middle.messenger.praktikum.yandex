import './messanger.scss';
import {default as layout} from './messanger.hbs?raw';
import Block from "../../framework/Block";
import {ChatsSearchForm, Popup} from "../../components/index";
import {createChats} from "../../utils/utils.js";
import Component from "../../framework/Component";

export class MessangerPage extends Block {
	constructor({chats, popups, onChangePage}: {
		chats:  Array<{
			name: string,
			avatar: string,
			lastTime: string,
			lastMessage: string,
			unreadMessagesCount: number
		}>,
		popups: Array<Popup>,
		onChangePage: (page: string) => void,
	}) {
		super({
			ChatsSearchForm: new ChatsSearchForm({
				onChange: (event: InputEvent) => {
					const searchValue = (event.target as HTMLInputElement).value.toLowerCase();

					this.children.ChatsList.setProps({
						content: createChats(chats.filter(({name}) => name.toLowerCase().includes(searchValue)), () => {
							return {
								currentChat: this.children.CurrentChat,
								...popups
							}
						})
					});
				}
			}),
			ChatsList: new Component({
				tag: 'ul',
				attr: {
					class: 'messanger__chats'
				},
				content: createChats(chats, () => {
					return {
						currentChat: this.children.CurrentChat,
						...popups
					}
				})
			}),
			CurrentChat: new Component({
				tag: 'div',
				attr: {
					class: "messanger__chat-window chat-window"
				},
				content: [
					new Component({
						tag: 'p',
						attr: {
							class: "chat-window__default-message"
						},
						content: 'Выберите чат чтобы отправить сообщение'
					})
				]
			}),
			ProfileLink: new Component({
				tag: 'a',
				attr: {
					href: '/profile',
					class: 'messanger__profile-link'
				},
				content: 'Профиль',
				events: {
					click: (event: MouseEvent) => {
						event.preventDefault();

						onChangePage('/profile');
					}
				}
			})
		});
	}

	render() {
		return layout;
	}
}


