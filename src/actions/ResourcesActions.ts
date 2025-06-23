import ResourcesApi from "../api/ResourcesApi";
import Action from "./Action";

export default class ResourcesActions extends Action {
    private api: ResourcesApi = new ResourcesApi();

    public uploadResource(formData: FormData) {
        return this.api.uploadResource(formData);
    }
}
