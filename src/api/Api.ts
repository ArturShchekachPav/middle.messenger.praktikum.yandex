import HTTPTransport from "./HTTTPTransport";

export default abstract class Api {
	protected baseUrl: string;
	protected http: HTTPTransport= new HTTPTransport();

	protected constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	protected checkResponse(xhr: XMLHttpRequest) {
		if (xhr.status === 200) {
			return xhr.response.json();
		}

		return Promise.reject(`Ошибка: ${xhr.status}`);
	}
}
