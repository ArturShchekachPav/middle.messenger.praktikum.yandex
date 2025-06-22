import {AddChatForm, Popup} from '../index';
import Actions from '../../actions';

export class AddChatPopup extends Popup {
	private actions: Actions = new Actions();
	private addChatForm: AddChatForm;

	constructor() {
		const addChatForm = new AddChatForm(
			(formData) => {
				this.actions.chats.addChat(formData)
					.then(() => {
						this.close();
					})
					.catch(console.log);
			}
		);

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
