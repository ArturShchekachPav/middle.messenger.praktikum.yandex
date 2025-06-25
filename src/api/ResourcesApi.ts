import Api from './Api';
import { ResourceDataType } from '../utils/types';

export default class ResourcesApi extends Api {
	constructor() {
		super('https://ya-praktikum.tech/api/v2/resources');
	}

	public uploadResource(formData: FormData) {
		if (!formData.has('resource')) {
			return Promise.reject();
		}

		return this.http
			.post(`${this.baseUrl}`, {
				withCredentials: true,
				body: formData,
			})
			.then(this.checkResponse)
			.then(this.parseResponse<ResourceDataType>);
	}
}
