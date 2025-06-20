import {Popup, UserActionForm} from '../index';
import Actions from '../../actions';

export class AddUserPopup extends Popup {
	private actions: Actions = new Actions();
	private addChatForm: UserActionForm;

	constructor() {
		const addChatForm = new UserActionForm({
			name: 'add-user',
			buttonText: 'Добавить',
			title: 'Добавить пользователя',
			onSubmit: (formData) => {
				this.actions.emit('addChat', formData);
				this.close();
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
