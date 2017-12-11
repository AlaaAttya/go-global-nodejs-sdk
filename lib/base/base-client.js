/**
 *
 *
 * @author Alaa Attya <alaa.attya91@gmail.com>
 */
class BaseClient {

    /**
     *
     * @param {RequestHandler} curlRequestHandler
     * @param {Object} apiCredentials
     *
     * @author Alaa Attya <alaa.attya91@gmail.com>
     */
    constructor(curlRequestHandler, apiCredentials) {
        this.curlRequestHandler = curlRequestHandler;
        this.apiCredentials = apiCredentials;
    }

}

module.exports = BaseClient;
