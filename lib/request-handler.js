import RequestType from './enum/request-type';

/**
 * Abstract AXIOS implementation
 *
 * @author Alaa Attya <alaa.attya91@gmail.com>
 */
class RequestHandler {

    /**
     *
     * @param {string} baseUrl
     * @param {Object} credentials
     * @param {axios} axios
     *
     * @author Alaa Attya <alaa.attya91@gmail.com>
     */
    constructor(baseUrl, credentials, axios) {
        this.baseUrl = baseUrl;
        this.credentials = credentials;
        this.axios = axios;
        this.axios.defaults.headers.post['Content-Type'] = 'text/xml';
    }

    /**
     *
     * @param {string} endpoint
     * @param {string} requestMethod
     * @param {Object} requestData
     * @param {Object} optionalHeaders
     *
     * @return {string}
     */
    async sendRequest(endpoint, requestMethod, requestData = {}, optionalHeaders = {}) {
        const url = this.baseUrl + endpoint;
        let apiResponse = {};
        switch (requestMethod) {
            case RequestType.POST:
                apiResponse = await this.postRequest(
                    url,
                    requestData,
                    optionalHeaders,
                );
                break;

            case RequestType.GET:
                apiResponse = await this.getRequest(
                    url,
                    requestData,
                );
                break;

            case RequestType.PUT:
                apiResponse = await this.putRequest(
                    url,
                    requestData,
                    optionalHeaders,
                );
                break;

            case RequestType.DELETE:
                apiResponse = await this.deleteRequest(
                    url,
                    requestData,
                    optionalHeaders,
                );
                break;

            default:
                throw new Error('un supported request method');
        }

        return apiResponse;
    }

    /**
     *
     * @param endpoint
     * @param requestData
     * @return {Promise}
     *
     * @private
     *
     * @author Alaa Attya <alaa.attya91@gmail.com>
     */
    postRequest(endpoint, requestData = {}) {
        return this.axios.post(endpoint, requestData);
    }

    /**
     *
     * @param endpoint
     * @param requestData
     *
     * @author Alaa Attya <alaa.attya91@gmail.com>
     */
    getRequest(endpoint, requestData = {}) {
        return this.axios.get(endpoint, requestData);
    }

    /**
     *
     * @param endpoint
     * @param requestData
     *
     * @author Alaa Attya <alaa.attya91@gmail.com>
     */
    putRequest(endpoint, requestData = {}) {
        return this.axios.put(endpoint, requestData);
    }

    /**
     *
     * @param endpoint
     * @param requestData
     *
     * @author Alaa Attya <alaa.attya91@gmail.com>
     */
    deleteRequest(endpoint, requestData = {}) {
        return this.axios.delete(endpoint, requestData);
    }

}

module.exports = RequestHandler;
