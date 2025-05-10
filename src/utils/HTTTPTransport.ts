import {METHOD} from "./constants";
import {Options, OptionsWithoutMethod} from "./types";

export default class HTTPTransport {
	public get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
		return this.request(url, {...options, method: METHOD.GET});
	};

	public post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
		return this.request(url, {...options, method: METHOD.POST});
	};

	public put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
		return this.request(url, {...options, method: METHOD.PUT});
	};

	public delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
		return this.request(url, {...options, method: METHOD.DELETE});
	};

	public patch(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
		return this.request(url, {...options, method: METHOD.PATCH});
	};

	private request(url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
		const {method, data} = options;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, url);

			xhr.onload = function() {
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
	};
}
