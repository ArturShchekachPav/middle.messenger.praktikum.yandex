import {AddFileForm, Popup} from '../index';
import Controller from '../../actions';

export class ChangeAvatarPopup extends Popup {
	private controller: Controller;
	private changeAvatarForm: AddFileForm;

	constructor() {
		const changeAvatarForm = new AddFileForm({
			formName: 'change-avatar',
			inputName: 'avatar',
			buttonText: 'Заменить',
			title: 'Изменить аватар',
			onSubmit: (formData) => {
				this.controller.emit('changeAvatar', formData);
				this.close();
			},
		});

		super({
			content: changeAvatarForm,
			isOpen: false,
		});

		this.controller = new Controller();
		this.controller.on('openEditAvatarPopup', this.open.bind(this));
		this.changeAvatarForm = changeAvatarForm;
	}

	close() {
		this.changeAvatarForm.reset();

		super.close();
	}
}
