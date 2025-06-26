import { METHOD } from '../../utils/constants';
import { HTTPMethod, Options } from '../../utils/types';

export default class Index {
	public get = this.createMethod(METHOD.GET);

	public put = this.createMethod(METHOD.PUT);

	public post = this.createMethod(METHOD.POST);

	public delete = this.createMethod(METHOD.DELETE);

	public patch = this.createMethod(METHOD.PATCH);

	private createMethod(method: METHOD): HTTPMethod {
		return (url, options = {}) => this.request(url, { ...options, method });
	}

	private request(
		url: string,
		options: Options = { method: METHOD.GET }
	): Promise<XMLHttpRequest> {
		const { method, body, headers, withCredentials } = options;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, url);

			xhr.onload = function () {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;

			if (headers) {
				Object.entries(headers).forEach(([key, value]) => {
					xhr.setRequestHeader(key, value);
				});
			}

			if (withCredentials) {
				xhr.withCredentials = withCredentials;
			}

			if (method === METHOD.GET || !body) {
				xhr.send();
			} else {
				xhr.send(body);
			}
		});
	}
}
