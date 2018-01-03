import { get } from 'lodash';
import RequestOperation from './../enum/request-operation';
import OperationType from './../enum/operation-type';
import * as xmlbuilder from 'xmlbuilder';
import htmlencode from 'htmlencode';

/**
 *
 * @param searchParams
 * @param apiCredential
 * @return {{
 *  Root: {
 *      Header: {
 *          Agency: *,
 *          User: *,
 *          Password: *,
 *          Operation: string,
 *          OperationType: string
 *      },
 *      Main: {
 *          @Version: *,
 *          @ResponseFormat: string,
 *          SortOrder: number,
 *          FilterPriceMin: number,
 *          MaxResponses: number,
 *          ArrivalDate: *,
 *          CityCode: *,
 *          Nights: number,
 *          Rooms: {Room: Array},
 *          Hotels: {HotelId: Array}
 *      }
 *  }
 * }}
 *
 * @author Alaa Attya <alaa.attya91@gmail.com>
 */
const prepareJsonData = (searchParams, apiCredential) => (
    {
        Root: {
            Header: {
                Agency: get(apiCredential, 'agency', ''),
                User: get(apiCredential, 'username', ''),
                Password: get(apiCredential, 'password', ''),
                Operation: RequestOperation.HOTEL_SEARCH_REQUEST,
                OperationType: OperationType.REQUEST,
            },
            Main: {
                '@Version': get(apiCredential, 'apiVersion', 2), // to make it xml response, set Version=1 and ResponseFormat="XML"
                '@ResponseFormat': 'JSON',
                SortOrder: 1,
                FilterPriceMin: 1,
                MaxResponses: 10, // limit the number of responses
                ArrivalDate: get(searchParams, 'checkInDate', ''),
                CityCode: get(searchParams, 'cityId', ''),
                Nights: 4,
                Rooms: {
                    Room: [],
                },
                Hotels: {
                    HotelId: [],
                },
            },
        },
    }
);

/**
 * Transform json object to xml string
 *
 * @param {Object} jsonData     json object to be transformed to xml
 * @return {string}
 *
 * @author Alaa Attya <alaa.attya91@gmail.com>
 */
const transformJsonToXml = (jsonData) => {
    let data = xmlbuilder.create(jsonData).end({ newline: '', separateArrayItems: true, allowEmpty: false });
    data = data.replace('<?xml version="1.0"?>', '');
    return data;
};

/**
 * HTML encode the xml string
 *
 * @param {string} xmlString     xml string to be encoded
 * @return {string}
 *
 * @author Alaa Attya <alaa.attya91@gmail.com>
 */
const encodeXmlString = xmlString => htmlencode.htmlEncode(xmlString);

/**
 * Transform search payload
 *
 * @param searchParams
 * @param apiCredentials
 * @return {string}
 *
 * @author Alaa Attya <alaa.attya91@gmail.com>
 */
const transformSearchPayload = (searchParams, apiCredentials) => {
    // Prepare json data
    const jsonData = prepareJsonData(searchParams, apiCredentials);
    // Transform json data to xml string
    const xmlString = transformJsonToXml(jsonData);
    // Encode xml string
    const encodedXmlBody = encodeXmlString(xmlString);

    return `${'<?xml version="1.0" encoding="utf-8"?>\n' +
        '<soap:Envelope\n' +
        '\txmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"\n' +
        '\txmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
        '\txmlns:xsd="http://www.w3.org/2001/XMLSchema">\n' +
        '\t<soap:Body>\n' +
        '\t\t<MakeRequest\n' +
        '\t\t\txmlns="http://www.goglobal.travel/">\n' +
        '\t\t\t<requestType>11</requestType>\n' +
        '\t\t\t<xmlRequest>'}${encodedXmlBody}` +
        '\t\t\t</xmlRequest>\n' +
        '\t\t</MakeRequest>\n' +
        '\t</soap:Body>\n' +
        '</soap:Envelope>';
};

module.exports = {
    transformSearchPayload,
    prepareJsonData,
};
