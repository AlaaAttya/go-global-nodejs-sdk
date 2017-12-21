import { Curl } from 'node-libcurl';
import RequestType from './enum/request-type';

/**
 * Abstract CURL implementation
 *
 * @author Alaa Attya <alaa.attya91@gmail.com>
 */
class RequestHandler {

    /**
     *
     * @param {string} baseUrl
     * @param {Object} credentials
     * @param {Object} curl
     *
     * @author Alaa Attya <alaa.attya91@gmail.com>
     */
    constructor(baseUrl, credentials, curl = {}) {
        this.baseUrl = baseUrl;
        this.credentials = credentials;

        if (JSON.stringify(curl) === JSON.stringify({})) {
            this.curl = new Curl();
        } else {
            this.requestHandler = curl;
        }

        this.defaultHeaders = [
            'Content-type: text/xml;charset=UTF-8',
            'Accept: text/xml',
            'Expect:',
            `User-Agent: ${credentials.agency}`,
            `SOAPAction: ${credentials.soapActionUrl}`,
        ];

        this.setCurlDefaultOpt();
    }

    /**
     *
     * @return void
     *
     * @author Alaa Attya <alaa.attya91@gmail.com>
     */
    setCurlDefaultOpt() {
        this.curl.setOpt('SSL_VERIFYHOST', 0);
        this.curl.setOpt('SSL_VERIFYPEER', 0);
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
                    requestMethod,
                    requestData,
                    optionalHeaders,
                );
                break;

            case RequestType.GET:
                apiResponse = await this.getRequest(
                    url,
                    requestMethod,
                    requestData,
                    optionalHeaders,
                );
                break;

            case RequestType.PUT:
                apiResponse = await this.putRequest(
                    url, requestMethod,
                    requestData,
                    optionalHeaders,
                );
                break;

            case RequestType.DELETE:
                apiResponse = await this.deleteRequest(
                    url,
                    requestMethod,
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
     * @param requestMethod
     * @param requestData
     * @param optionalHeaders
     * @return {Promise}
     *
     * @author Alaa Attya <alaa.attya91@gmail.com>
     */
    postRequest(endpoint, requestMethod, requestData = {}, optionalHeaders = {}) {
        const headers = this.defaultHeaders.concat(optionalHeaders);
        const { curl } = this;
        curl.setOpt(Curl.option.URL, endpoint);
        curl.setOpt(Curl.option.POST, 1);
        curl.setOpt(Curl.option.POSTFIELDS, requestData);
        curl.setOpt(Curl.option.HTTPHEADER, headers);

        return this.runCurlRequest(curl);
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
    getRequest(endpoint, requestMethod, requestData = {}, optionalHeaders = {}) {
        // TODO
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
        // TODO
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
        // TODO
    }

    /**
     *
     * @param curl
     * @return {Promise}
     *
     * @author Alaa Attya <alaa.attya91@gmail.com>
     */
    async runCurlRequest(curl) {
        return new Promise((resolve, reject) => {
            curl.on('end', (code, body) => {
                const info = {};
                Object.keys(Curl.info)
                    .filter(i => i !== 'debug')
                    .forEach((key) => {
                        info[key] = curl.getInfo(key);
                    });

                const time = {
                    dns: info.NAMELOOKUP_TIME * 1000,
                    connect: info.CONNECT_TIME * 1000,
                    pretransfer: info.PRETRANSFER_TIME * 1000,
                    firstbyte: info.STARTTRANSFER_TIME * 1000,
                    total: info.TOTAL_TIME * 1000,
                };

                curl.close.bind(curl);
                const obj = {
                    statusCode: code,
                    body,
                    info,
                    time,
                };

                return resolve(obj);
            });

            curl.on('error', (err, curlErrCode) => {
                console.log(curlErrCode);
                curl.close.bind(curl);
                const obj = {
                    error: err,
                    curlErrorCode: curlErrCode,
                };

                return reject(obj);
            });

            curl.perform();
        });
    }

}

module.exports = RequestHandler;
