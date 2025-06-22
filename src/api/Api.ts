import HTTPTransport from "./HTTTPTransport";

export default abstract class Api {
	protected baseUrl: string;
	protected http: HTTPTransport= new HTTPTransport();

	protected constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	protected checkResponse(xhr: XMLHttpRequest) {
		if (xhr.status === 200) {
			return xhr;
		}

		return Promise.reject(`Ошибка: ${xhr.status}`);
	}

	protected parseResponse<T>(xhr: XMLHttpRequest): T {
		return JSON.parse(xhr.response) as T;
	}
}
