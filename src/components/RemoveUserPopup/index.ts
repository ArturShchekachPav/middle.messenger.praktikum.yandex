import {Popup, UserActionForm} from '../index';
import Actions from '../../actions';
import withCurrentChatData from '../../HOC/withCurrentChatData';
import { CurrentChatType } from '../../utils/types';

class RemoveUserPopup extends Popup {
	private actions: Actions;
	private removeChatForm: UserActionForm;

	constructor({currentChat}: {currentChat: CurrentChatType}) {
		const removeChatForm = new UserActionForm({
			name: 'remove-user',
			buttonText: 'Удалить',
			title: 'Удалить пользователя',
			onSubmit: ({login}) => {
				if(typeof login === 'string') {
					this.actions.users.searchForUserByLogin(login)
					.then(users => this.actions.chats.deleteUsersFromChat({
						users: users.map(user => user.id),
						chatId: currentChat.id
					}))
					.then(() => this.close())
					.catch(console.log);
				}
			},
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

export default withCurrentChatData(RemoveUserPopup);
