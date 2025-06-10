import './messanger.scss';
import {default as layout} from './messanger.hbs?raw';
import Block from '../../framework/Block';
import {ChatsList, ChatsSearchForm, ChatWindow} from '../../components/index';
import Component from '../../framework/Component';
import Controller from '../../controllers';

export class MessangerPage extends Block {
	private controller: Controller;

	constructor({
								chats,
							}: {
		chats: Array<{
			name: string;
			avatar: string;
			lastTime: string;
			lastMessage: string;
			unreadMessagesCount: string;
		}>;
	}) {
		super({
			ChatsSearchForm: new ChatsSearchForm(),
			ChatsList: new ChatsList(chats),
			ChatWindow: new ChatWindow(),
			ProfileLink: new Component({
				tag: 'a',
				attr: {
					href: '/profile',
					class: 'messanger__profile-link',
				},
				content: 'Профиль',
				events: {
					click: (event: MouseEvent) => {
						event.preventDefault();

						this.controller.emit('changePage', '/profile');
					},
				},
			}),
		});

		this.controller = new Controller();
	}

	render() {
		return layout;
	}
}
