import {UserActionForm, Popup} from "../index";
import Controller from "../../controllers";

export class AddUserPopup extends Popup {
	private controller: Controller;
	private addChatForm: UserActionForm;

	constructor() {
		const addChatForm = new UserActionForm({
			name: 'add-user',
			buttonText: 'Добавить',
			title: 'Добавить пользователя',
			onSubmit: (formData) => {
				this.controller.emit('addChat', formData);
				this.close();
			},
		});

		super({
			isOpen: false,
			content: addChatForm
		});

		this.addChatForm = addChatForm;
		this.controller = new Controller();
		this.controller.on('openAddUserPopup', this.open.bind(this));
	}

	close() {
		this.addChatForm.reset();

		super.close();
	}
}
