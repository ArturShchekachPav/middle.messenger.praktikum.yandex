import { AddFileForm, ErrorMessage, Popup } from '../index';
import Actions from '../../actions';

export class ChangeAvatarPopup extends Popup {
	private actions: Actions = new Actions();
	private changeAvatarForm: AddFileForm;

	constructor() {
		const changeAvatarForm = new AddFileForm({
			formName: 'change-avatar',
			inputName: 'avatar',
			buttonText: 'Заменить',
			title: 'Изменить аватар',
			onSubmit: (_, event: SubmitEvent) => {
				const formData = new FormData(event.target as HTMLFormElement);

				this.actions.users
					.changeUserAvatar(formData)
					.then(() => {
						this.close();
					})
					.catch(({ reason }) => {
						if (typeof reason === 'string') {
							const errorMessage = this.changeAvatarForm.children.ErrorMessage;

							if (errorMessage instanceof ErrorMessage) {
								errorMessage.enable(reason);
							}
						}
					});
			},
		});

		super({
			content: changeAvatarForm,
			isOpen: false,
		});

		this.actions.on('openEditAvatarPopup', this.open.bind(this));
		this.changeAvatarForm = changeAvatarForm;
	}

	close() {
		this.changeAvatarForm.reset();

		super.close();
	}
}
