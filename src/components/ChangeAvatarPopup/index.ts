import {AddFileForm, Popup} from '../index';
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
			onSubmit: (formData) => {
				this.actions.emit('changeAvatar', formData);
				this.close();
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
