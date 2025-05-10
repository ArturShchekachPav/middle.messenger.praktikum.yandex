import {UserActionForm, Popup} from "../index";
import Controller from "../../controllers";

export class RemoveUserPopup extends Popup {
	constructor() {
		const removeChatForm = new UserActionForm({
			name: 'remove-user',
			buttonText: 'Удалить',
			title: 'Удалить пользователя',
			onSumbit: (formData) => {
				this.controller.emit('addChat', formData);
				this.close();
			},
		});

		super({
			isOpen: false,
			content: removeChatForm
		});

		this.removeChatForm = removeChatForm;
		this.controller = new Controller();
		this.controller.on('openRemoveUserPopup', this.open.bind(this));
	}

	close() {
		this.removeChatForm.reset();

		super.close();
	}
}
