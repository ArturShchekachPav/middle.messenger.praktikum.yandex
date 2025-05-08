const METHODS = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
};

function queryStringify(data: Record<string, string | number>) {
	const keys = Object.keys(data);
	return keys.reduce((result, key, index) => {
		return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
	}, '?');
}

class HTTPTransport {
	protected get = (url: string, options: Record<string, unknown> = {}) => {

		return this.request(
			url,
			{...options, method: METHODS.GET},
			typeof options.timeout === 'number' ? options.timeout : undefined
		);
	};

	protected post = (url: string, options: Record<string, unknown> = {}) => {
		return this.request(
			url,
			{...options, method: METHODS.POST},
			typeof options.timeout === 'number' ? options.timeout : undefined
		);
	};

	protected put = (url: string, options: Record<string, unknown> = {}) => {
		return this.request(
			url,
			{...options, method: METHODS.PUT},
			typeof options.timeout === 'number' ? options.timeout : undefined
		);
	};

	protected delete = (url: string, options: Record<string, unknown> = {}) => {
		return this.request(
			url,
			{...options, method: METHODS.DELETE},
			typeof options.timeout === 'number' ? options.timeout : undefined
		);
	};

	request = (
		url: string,
		options: {
			headers?: Record<string, string>,
			method?: string,
			data?:  Document | XMLHttpRequestBodyInit | null | undefined, Re
		} = {},
		timeout = 5000
	) => {
		const {headers = {}, method, data} = options;

		return new Promise(function (resolve, reject) {
			if (!method) {
				reject('No method');
				return;
			}

			const xhr = new XMLHttpRequest();
			const isGet = method === METHODS.GET;

			xhr.open(
				method,
				isGet && !!data
					? `${url}${queryStringify(data)}`
					: url,
			);

			Object.keys(headers).forEach(key => {
				xhr.setRequestHeader(key, headers[key]);
			});

			xhr.onload = function () {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;

			xhr.timeout = timeout;
			xhr.ontimeout = reject;

			if (isGet || !data) {
				xhr.send();
			} else {
				xhr.send(data);
			}
		});
	};
}
