import {AddFileForm, Popup} from '../index';
import Actions from '../../actions';

export class AddMediaPopup extends Popup {
	private actions: Actions = new Actions();
	private addMediaForm: AddFileForm;

	constructor() {
		const addMediaForm = new AddFileForm({
			formName: 'add-media-file',
			inputName: 'resource',
			buttonText: 'Добавить',
			title: 'Добавить фото/видео',
			onSubmit: (_, event: SubmitEvent) => {
				if(event.target instanceof HTMLFormElement) {
					const formData = new FormData(event.target);

					this.actions.resources.uploadResource(formData)
					.then(() => this.close())
					.catch(console.log);
				}
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
