import HotelClient from './clients/hotel-client';
import RequestHandler from './request-handler';

/**
 * @author Alaa Attya <alaa.attya91@gmail.com>
 */
class GoGlobal {

    /**
     * By default i use curl request handler
     * But you can pass your preferred request handler
     * via the `request handler param`
     *
     * @param {Object} apiCredentials
     * @param {string} baseUrl
     * @param {RequestHandler} requestHandler
     *
     * @author Alaa Attya <alaa.attya91@gmail.com>
     */
    constructor(apiCredentials, baseUrl = '', requestHandler = {}) {
        this.apiCredentials = apiCredentials;

        // If handler was not specified, let's create it
        if (JSON.stringify(requestHandler) === JSON.stringify({})) {
            this.requestHandler = new RequestHandler(baseUrl, apiCredentials);
        } else {
            this.requestHandler = requestHandler;
        }

    }

    /**
     * Get hotel client object
     *
     * @return {HotelClient}
     *
     * @author Alaa Attya <alaa.attya91@gmail.com>
     */
    getHotelClient() {
        return new HotelClient(this.requestHandler);
    }

}

module.exports = GoGlobal;
