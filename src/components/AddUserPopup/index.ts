import {Popup, UserActionForm} from '../index';
import Actions from '../../actions';
import { CurrentChatType } from '../../utils/types';
import withCurrentChatData from '../../HOC/withCurrentChatData';

class AddUserPopup extends Popup {
	private actions: Actions = new Actions();
	private addChatForm: UserActionForm;

	constructor({currentChat}: {currentChat: CurrentChatType}) {
		const addChatForm = new UserActionForm({
			name: 'add-user',
			buttonText: 'Добавить',
			title: 'Добавить пользователя',
			onSubmit: ({login}) => {
				if(typeof login === 'string') {
					this.actions.users.searchForUserByLogin(login)
					.then(users => this.actions.chats.addUsersToChat({
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

export default withCurrentChatData(AddUserPopup);
