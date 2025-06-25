import {AddFileForm, ErrorMessage, Popup} from '../index';
import Actions from '../../actions';
import {ResourceDataType} from "../../utils/types";

export class AddMediaPopup extends Popup {
	private actions: Actions = new Actions();
	private addMediaForm: AddFileForm;

	constructor() {
		const addMediaForm = new AddFileForm({
			formName: 'add-media-file',
			inputName: 'resource',
			buttonText: 'Добавить',
			title: 'Добавить изображение',
			onSubmit: (_, event: SubmitEvent) => {
				if(event.target instanceof HTMLFormElement) {
					const formData = new FormData(event.target);

					this.actions.resources.uploadResource(formData)
						.then((resource: ResourceDataType) => {
							this.actions.messages.sendFile(resource.id);
							this.close();
						})
						.catch(({reason}) => {
							if(typeof reason === 'string') {
								const errorMessage = this.addMediaForm.children.ErrorMessage;

								if(errorMessage instanceof ErrorMessage) {
									errorMessage.enable(reason);
								}
							}
						});
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
