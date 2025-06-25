import {Popup, UserActionForm, UsersList} from '../index';
import Actions from '../../actions';
import {CurrentUserType } from '../../utils/types';
import { USER_ADD_FORM_CONFIG } from '../../utils/constants';

export class AddUserPopup extends Popup {
	private actions: Actions = new Actions();
	private addChatForm: UserActionForm;

	constructor() {
		const users = new UsersList({users: [], onClick: () => {}});

		const addChatForm = new UserActionForm({
			name: 'add-user',
			title: 'Добавить пользователя',
			onSubmit: ({login}) => {
				if(typeof login === 'string') {
					this.actions.users.searchForUserByLogin(login)
					.then((usersData: CurrentUserType[]) => users.setProps({
						users: usersData,
						onClick: (user: CurrentUserType) => {
							const chatId = this.actions.getAppState().currentChat?.id;

							if(chatId) {
								this.actions.chats.addUsersToChat({chatId, users: [user.id]})
								.then(() => {
								this.close();
								})
								.catch(console.log);
							}
						},
					}));
				}
			},
			onInput: (login: string) => {
				this.actions.users.searchForUserByLogin(login)
				.then((usersData: CurrentUserType[]) => users.setProps({
					users: usersData,
					onClick: (user: CurrentUserType) => {
						const chatId = this.actions.getAppState().currentChat?.id;

						if(chatId) {
							this.actions.chats.addUsersToChat({chatId, users: [user.id]})
							.then(() => {
							this.close();
							})
							.catch(console.log);
						}
					},
				}));
			},
			Users: users,
			fieldsConfig: USER_ADD_FORM_CONFIG
		});

		super({
			isOpen: false,
			content: addChatForm,
		});

		this.addChatForm = addChatForm;
		this.actions.on('openAddUserPopup', this.open.bind(this));
	}

	close() {
		this.addChatForm.reset();

		super.close();
	}
}