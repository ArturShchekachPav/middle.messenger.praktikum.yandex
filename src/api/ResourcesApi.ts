import Api from "./Api";

export default class ResourcesApi extends Api{
    constructor() {
        super('https://ya-praktikum.tech/api/v2/resources');
    }

    public uploadResource(formData: FormData) {
        if(!formData.has('avatar')) {
			return Promise.reject();
		}

        return this.http.put(
            `${this.baseUrl}`,
            {
                withCredentials: true,
                body: formData
            }
        )
            .then(this.checkResponse)
            .then(this.parseResponse);
    }
}
