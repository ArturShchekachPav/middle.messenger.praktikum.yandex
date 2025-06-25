import { Popup, UserActionForm, UsersList } from '../index';
import Actions from '../../actions';
import { CurrentUserType } from '../../utils/types';
import { USER_REMOVE_FORM_CONFIG } from '../../utils/constants';

export class RemoveUserPopup extends Popup {
	private actions: Actions;
	private removeChatForm: UserActionForm;

	constructor() {
		const users = new UsersList({ users: [], onClick: () => {} });

		const removeChatForm = new UserActionForm({
			name: 'remove-user',
			title: 'Удалить пользователя',
			onSubmit: ({ first_name }) => {
				const chatId = this.actions.getAppState().currentChat?.id;

				if (typeof first_name === 'string' && chatId) {
					this.actions.chats
						.getChatUsers(chatId, { name: first_name })
						.then((usersData: CurrentUserType[]) =>
							users.setProps({
								users: usersData,
								onClick: (user: CurrentUserType) => {
									this.actions.chats
										.deleteUsersFromChat({ chatId: chatId, users: [user.id] })
										.then(() => {
											this.close();
										})
										.catch(console.log);
								},
							})
						);
				}
			},
			onInput: (first_name: string) => {
				const chatId = this.actions.getAppState().currentChat?.id;

				if (chatId) {
					this.actions.chats
						.getChatUsers(chatId, { name: first_name })
						.then((usersData: CurrentUserType[]) =>
							users.setProps({
								users: usersData,
								onClick: (user: CurrentUserType) => {
									this.actions.chats
										.deleteUsersFromChat({ chatId: chatId, users: [user.id] })
										.then(() => {
											this.close();
										})
										.catch(console.log);
								},
							})
						);
				}
			},
			Users: users,
			fieldsConfig: USER_REMOVE_FORM_CONFIG,
		});

		super({
			isOpen: false,
			content: removeChatForm,
		});

		this.removeChatForm = removeChatForm;
		this.actions = new Actions();
		this.actions.on('openRemoveUserPopup', this.open.bind(this));
	}

	close() {
		this.removeChatForm.reset();

		super.close();
	}
}
