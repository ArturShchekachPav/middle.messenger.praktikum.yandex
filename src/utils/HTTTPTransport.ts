import {METHOD} from './constants';
import {HTTPMethod, Options} from './types';

export default class HTTPTransport {
	public get = this.createMethod(METHOD.GET);

	public put = this.createMethod(METHOD.PUT);

	public post = this.createMethod(METHOD.POST);

	public delete = this.createMethod(METHOD.DELETE);

	public patch = this.createMethod(METHOD.PATCH);

	private createMethod(method: METHOD): HTTPMethod {
		return (url, options = {}) => this.request(url, {...options, method});
	}

	private request(
		url: string,
		options: Options = {method: METHOD.GET}
	): Promise<XMLHttpRequest> {
		const {method, data} = options;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, url);

			xhr.onload = function () {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;

			if (method === METHOD.GET || !data) {
				xhr.send();
			} else {
				xhr.send(data);
			}
		});
	}
}
