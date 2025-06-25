import { AddFileForm, ErrorMessage, Popup } from '../index';
import Actions from '../../actions';

export class ChangeChatAvatarPopup extends Popup {
	private actions: Actions = new Actions();
	private changeChatAvatarForm: AddFileForm;

	constructor() {
		const changeChatAvatarForm = new AddFileForm({
			formName: 'change-avatar',
			inputName: 'avatar',
			buttonText: 'Заменить',
			title: 'Изменить аватар чата',
			onSubmit: (_, event: SubmitEvent) => {
				const formData = new FormData(event.target as HTMLFormElement);

				this.actions.chats
					.uploadChatAvatar(formData)
					.then(() => {
						this.close();
					})
					.catch(({ reason }) => {
						if (typeof reason === 'string') {
							const errorMessage =
								this.changeChatAvatarForm.children.ErrorMessage;

							if (errorMessage instanceof ErrorMessage) {
								errorMessage.enable(reason);
							}
						}
					});
			},
		});

		super({
			content: changeChatAvatarForm,
			isOpen: false,
		});

		this.actions.on('openEditChatAvatarPopup', this.open.bind(this));
		this.changeChatAvatarForm = changeChatAvatarForm;
	}

	close() {
		this.changeChatAvatarForm.reset();

		super.close();
	}
}
