import {AddFileForm, Popup} from "../index";
import Controller from "../../controllers";

export class AddFilePopup extends Popup {
	private controller: Controller;
	private addFileForm: AddFileForm;

	constructor() {
		const addFileForm = new AddFileForm({
			formName: 'add-file',
			inputName: 'file',
			buttonText: 'Добавить',
			title: 'Добавить файл',
			onSubmit: (formData) => {
				this.controller.emit('sendFile', formData);
				this.close();
			},
		});

		super({
			isOpen: false,
			content: addFileForm,
		});

		this.addFileForm = addFileForm;
		this.controller = new Controller();
		this.controller.on('openAddFilePopup', this.open.bind(this));
	}

	close() {
		this.addFileForm.reset();

		super.close();
	}
}
