import './styles.scss';
import {default as template} from './template.hbs?raw';
import Block from '../../framework/Block';
import {
	AddChatPopup,
	AddMediaPopup,
	AddUserPopup,
	ChangeChatAvatarPopup,
	ChatsList,
	ChatsSearchForm,
	ChatWindow,
	MenuItem,
	RemoveUserPopup
} from '../../components/index';
import Component from '../../framework/Component';
import Router from "../../router/Router";
import Actions from "../../actions";

const router = new Router();

export class MessangerPage extends Block {
	private router: Router = router;
	private actions: Actions = new Actions();

	constructor() {
		super({
			ChatsSearchForm: new ChatsSearchForm(),
			AddImagePopup: new AddMediaPopup(),
			AddUserPopup: new AddUserPopup(),
			RemoveUserPopup: new RemoveUserPopup(),
			AddChatPopup: new AddChatPopup(),
			ChangeChatAvatarPopup: new ChangeChatAvatarPopup(),
			ChatsList: new ChatsList(),
			ChatWindow: new ChatWindow(),
			ChatsActions: new Component({
				tag: 'ul',
				attr: {
					class: 'messanger__chat-actions',
				},
				content: [
					new MenuItem({
						text: 'Добавить чат',
						icon: '/add-icon.svg',
						events: {
							click: () => {
								this.actions.emit('openAddChatPopup');
							},
						},
					})
				]
			}),
			ProfileLink: new Component({
				tag: 'a',
				attr: {
					href: '/settings',
					class: 'messanger__profile-link',
				},
				content: 'Профиль',
				events: {
					click: (event: MouseEvent) => {
						event.preventDefault();

						this.router.go('/settings');
					},
				},
			}),
		});

	}

	render() {
		return template;
	}
}
