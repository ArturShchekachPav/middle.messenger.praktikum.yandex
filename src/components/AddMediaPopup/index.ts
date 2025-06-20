import {AddFileForm, Popup} from '../index';
import Actions from '../../actions';

export class AddMediaPopup extends Popup {
	private actions: Actions = new Actions();
	private addMediaForm: AddFileForm;

	constructor() {
		const addMediaForm = new AddFileForm({
			formName: 'add-media-file',
			inputName: 'file',
			buttonText: 'Добавить',
			title: 'Добавить фото/видео',
			onSubmit: (formData) => {
				this.actions.emit('sendMedia', formData);
				this.close();
			},
		});

		super({
			isOpen: false,
			content: addMediaForm,
		});

		this.addMediaForm = addMediaForm;

		this.actions.on('openAddMediaPopup', this.open.bind(this));
	}

	close() {
		this.addMediaForm.reset();

		super.close();
	}
}
