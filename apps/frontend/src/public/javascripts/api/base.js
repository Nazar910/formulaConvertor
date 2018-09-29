export default class BaseClient {
    /**
     * @constructor
     * @param {String} token - jwt token to authorize with
     */
    constructor(token) {
        this.token = token;
        this.baseUrl = document.querySelector('meta[name="api-uri"]').content;
    }

    /**
     * Base method to constructing a request
     *
     * @param {STRING} url - relative url of the request
     * @param {String} method - HTTP method e.g. GET, POST, PUT, DELETE
     * @param {Object} body - object to send
     *
     * @returns {Promise} promise that resolves with response
     */
    makeRequest(url, method, body) {
        const options = {};
        options.headers = {
            Authorization: this.token
        };
        options.method = method;

        if (body) {
            options.headers['content-type'] = 'application/json';
            options.body = JSON.stringify(body);
        }

        return fetch(this.baseUrl + url, options);
    }

    /**
     * Make get request
     * @param {String} url - relative url for a request
     *
     * @returns {Promise} promise that resolves with response
     */
    get(url) {
        return this.makeRequest(url, 'GET');
    }

    /**
     * Make a post request
     * @param {String} url - relative url
     * @param {Object} body - data to send
     *
     * @returns {Promise} promise that resolves with response
     */
    post(url, body) {
        return this.makeRequest(url, 'POST', body);
    }

    /**
     * Make a patch request
     * @param {String} url - relative url
     * @param {Object} body - data to send
     *
     * @returns {Promise} promise that resolves with response
     */
    patch(url, body) {
        return this.makeRequest(url, 'PATCH', body);
    }

    /**
     * Make a delete request
     * @param {String} url - relative url
     *
     * @returns {Promise} promise that resolves with response
     */
    delete(url) {
        return this.makeRequest(url, 'DELETE');
    }
}
