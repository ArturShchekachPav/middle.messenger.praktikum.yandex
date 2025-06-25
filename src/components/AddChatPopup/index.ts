import { AddChatForm, ErrorMessage, Popup } from '../index';
import Actions from '../../actions';

export class AddChatPopup extends Popup {
	private actions: Actions = new Actions();
	private addChatForm: AddChatForm;

	constructor() {
		const addChatForm = new AddChatForm((formData) => {
			this.actions.chats
				.addChat(formData)
				.then(() => {
					this.actions.emit('clearSearchForm');
					this.close();
				})
				.catch(({ reason }) => {
					if (typeof reason === 'string') {
						const errorMessage = this.addChatForm.children.ErrorMessage;

						if (errorMessage instanceof ErrorMessage) {
							errorMessage.enable(reason);
						}
					}
				});
		});

		super({
			isOpen: false,
			content: addChatForm,
		});

		this.addChatForm = addChatForm;

		this.actions.on('openAddChatPopup', this.open.bind(this));
	}

	close() {
		this.addChatForm.reset();

		super.close();
	}
}
