import HotelClient from './clients/hotel-client';
import RequestHandler from './request-handler';

/**
 * @author Alaa Attya <alaa.attya91@gmail.com>
 */
class GoGlobal {

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
     * @return {HotelClient}
     */
    getHotelClient() {
        return new HotelClient(this.requestHandler);
    }

}

module.exports = GoGlobal;
