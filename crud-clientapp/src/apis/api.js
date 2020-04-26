import axios from "axios";
export class Api {
    constructor(config) {
        this.api = axios.create(config);
        // this middleware is been called right before the http request is made.
        this.api.interceptors.request.use((param) => ({
            ...param
        }));
        // this middleware is been called right before the response is get it by the method that triggers the request
        this.api.interceptors.response.use((param) => ({
            ...param
        }));
    }
    getUri(config) {
        return this.api.getUri(config);
    }
    request(config) {
        return this.api.request(config);
    }
    get(url, config) {
        return this.api.get(url, config);
    }
    delete(url, config) {
        return this.api.delete(url, config);
    }
    head(url, config) {
        return this.api.head(url, config);
    }
    post(url, data, config) {
        return this.api.post(url, data, config);
    }
    put(url, data, config) {
        return this.api.put(url, data, config);
    }
    patch(url, data, config) {
        return this.api.patch(url, data, config);
    }
}
//# sourceMappingURL=api.js.map