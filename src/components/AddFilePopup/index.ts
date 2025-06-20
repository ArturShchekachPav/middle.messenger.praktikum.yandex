import {AddFileForm, Popup} from '../index';
import Actions from '../../actions';

export class AddFilePopup extends Popup {
	private actions: Actions = new Actions();
	private addFileForm: AddFileForm;

	constructor() {
		const addFileForm = new AddFileForm({
			formName: 'add-file',
			inputName: 'file',
			buttonText: 'Добавить',
			title: 'Добавить файл',
			onSubmit: (formData) => {
				this.actions.emit('sendFile', formData);
				this.close();
			},
		});

		super({
			isOpen: false,
			content: addFileForm,
		});

		this.addFileForm = addFileForm;
		this.actions.on('openAddFilePopup', this.open.bind(this));
	}

	close() {
		this.addFileForm.reset();

		super.close();
	}
}
