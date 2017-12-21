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
        this.defaultHeaders = {
            'Content-type': 'text/xml',
            'Accept': 'text/xml',
            'User-Agent': this.credentials.agency,
            'SOAPAction': this.credentials.soapActionUrl,
            'Content-Type': 'text/xml;charset=UTF-8',
        };
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
                apiResponse =  await this.postRequest(
                    url,
                    requestData,
                    optionalHeaders,
                );
                break;

            case RequestType.GET:
                apiResponse = await this.getRequest(
                    url,
                    requestData,
                    optionalHeaders,
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
    async postRequest(endpoint, requestData = {}) {
        return await this.axios.post(endpoint, requestData);
    }

    /**
     *
     * @param endpoint
     * @param requestMethod
     * @param requestData
     *
     * @author Alaa Attya <alaa.attya91@gmail.com>
     */
    getRequest(endpoint, requestMethod, requestData = {}) {

    }

    /**
     *
     * @param endpoint
     * @param requestMethod
     * @param requestData
     * @param optionalHeaders
     *
     * @author Alaa Attya <alaa.attya91@gmail.com>
     */
    putRequest(endpoint, requestMethod, requestData = {}, optionalHeaders = {}) {

    }

    /**
     *
     * @param endpoint
     * @param requestMethod
     * @param requestData
     * @param optionalHeaders
     *
     * @author Alaa Attya <alaa.attya91@gmail.com>
     */
    deleteRequest(endpoint, requestMethod, requestData = {}, optionalHeaders = {}) {

    }

}

module.exports = RequestHandler;
