import {Popup, UserActionForm} from '../index';
import Actions from '../../actions';

export class RemoveUserPopup extends Popup {
	private actions: Actions;
	private removeChatForm: UserActionForm;

	constructor() {
		const removeChatForm = new UserActionForm({
			name: 'remove-user',
			buttonText: 'Удалить',
			title: 'Удалить пользователя',
			onSubmit: (formData) => {
				this.actions.emit('addChat', formData);
				this.close();
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
