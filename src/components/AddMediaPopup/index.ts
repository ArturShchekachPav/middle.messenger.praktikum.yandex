import {AddFileForm, Popup} from '../index';
import Controller from '../../controllers';

export class AddMediaPopup extends Popup {
	private controller: Controller;
	private addMediaForm: AddFileForm;

	constructor() {
		const addMediaForm = new AddFileForm({
			formName: 'add-media-file',
			inputName: 'file',
			buttonText: 'Добавить',
			title: 'Добавить фото/видео',
			onSubmit: (formData) => {
				this.controller.emit('sendMedia', formData);
				this.close();
			},
		});

		super({
			isOpen: false,
			content: addMediaForm,
		});

		this.addMediaForm = addMediaForm;
		this.controller = new Controller();
		this.controller.on('openAddMediaPopup', this.open.bind(this));
	}

	close() {
		this.addMediaForm.reset();

		super.close();
	}
}
