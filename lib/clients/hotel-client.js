import BaseClient from '../base/base-client';
import { transformSearchPayload } from '../transformers/hotel-search-payload-transformer';

/**
 * @author Alaa Attya <alaa.attya91@gmail.com>
 */
class HotelClient extends BaseClient {

    /**
     *
     * @param params
     * @return {Promise.<*>}
     *
     * @author Alaa Attya <alaa.attya91@gmail.com>
     */
    async search(params) {
        const requestXmlStringPayload = transformSearchPayload(params, this.apiCredentials, {
            operation: 'HOTEL_SEARCH_REQUEST',
            operationType: 'Request',
        });

        const apiResponse = await this.curlRequestHandler.sendRequest('', 'post', requestXmlStringPayload);

        return apiResponse;
    }

}

module.exports = HotelClient;
