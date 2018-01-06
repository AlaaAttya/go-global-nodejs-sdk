import { prepareJsonData, transformSearchPayload, __RewireAPI__ } from './../../../lib/transformers/hotel-search-payload-transformer';


// eslint-disable-next-line no-underscore-dangle
const transformRoomsPayload = __RewireAPI__.__get__('transformRoomsPayload');

describe('should have valid xml payload', () => {

    it('should have valid json data', () => {
        const searchParam = {
            checkInDate: '2017-09-11',
            checkoutDate: '2017-09-15',
            cityId: 123,
            rooms: [],
        };

        const credentials = {
            soapActionUrl: 'http://www.goglobal.travel/MakeRequest',
            agency: '123',
            username: 'alaa',
            password: '11232342fgtrh',
            apiVersion: 1,
        };

        const expectedJsonResult = {
            Root: {
                Header: {
                    Agency: '123',
                    User: 'alaa',
                    Password: '11232342fgtrh',
                    Operation: 'HOTEL_SEARCH_REQUEST',
                    OperationType: 'Request',
                },
                Main: {
                    '@Version': 1,
                    '@ResponseFormat': 'JSON',
                    SortOrder: 1,
                    FilterPriceMin: 1,
                    MaxResponses: 10, // limit the number of responses
                    ArrivalDate: '2017-09-11',
                    CityCode: 123,
                    Nights: 4,
                    Rooms: {
                        Room: [],
                    },
                    Hotels: {
                        HotelId: [],
                    },
                },
            },
        };

        expect(prepareJsonData(searchParam, credentials)).toEqual(expectedJsonResult);

    });

    it('should return valid xml string', () => {
        const jsonData = {
            Root: {
                Header: {
                    Agency: '123',
                    User: 'alaa',
                    Password: '11232342fgtrh',
                    Operation: 'HOTEL_SEARCH_REQUEST',
                    OperationType: 'Request',
                },
                Main: {
                    '@Version': 1,
                    '@ResponseFormat': 'JSON',
                    SortOrder: 1,
                    FilterPriceMin: 1,
                    MaxResponses: 10, // limit the number of responses
                    ArrivalDate: '2017-09-11',
                    CityCode: 123,
                    Nights: 4,
                    Rooms: {
                        Room: [],
                    },
                    Hotels: {
                        HotelId: [],
                    },
                },
            },
        };

        const encodedXmlString = '&lt;Root&gt;&lt;Header&gt;&lt;Agency/&gt;&lt;User/&gt;&lt;Password/&gt;&lt;Operation&gt;HOTEL_SEARCH_REQUEST&lt;/Operation&gt;&lt;OperationType&gt;Request&lt;/OperationType&gt;&lt;/Header&gt;&lt;Main Version=&quot;2&quot; ResponseFormat=&quot;JSON&quot;&gt;&lt;SortOrder&gt;1&lt;/SortOrder&gt;&lt;FilterPriceMin&gt;1&lt;/FilterPriceMin&gt;&lt;MaxResponses&gt;10&lt;/MaxResponses&gt;&lt;ArrivalDate/&gt;&lt;CityCode/&gt;&lt;Nights&gt;4&lt;/Nights&gt;&lt;Rooms&gt;&lt;Room/&gt;&lt;/Rooms&gt;&lt;Hotels&gt;&lt;HotelId/&gt;&lt;/Hotels&gt;&lt;/Main&gt;&lt;/Root&gt;';
        const expectedXmlString = `${'<?xml version="1.0" encoding="utf-8"?>\n' +
            '<soap:Envelope\n' +
            '\txmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"\n' +
            '\txmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
            '\txmlns:xsd="http://www.w3.org/2001/XMLSchema">\n' +
            '\t<soap:Body>\n' +
            '\t\t<MakeRequest\n' +
            '\t\t\txmlns="http://www.goglobal.travel/">\n' +
            '\t\t\t<requestType>11</requestType>\n' +
            '\t\t\t<xmlRequest>'}${encodedXmlString}` +
            '\t\t\t</xmlRequest>\n' +
            '\t\t</MakeRequest>\n' +
            '\t</soap:Body>\n' +
            '</soap:Envelope>';

        expect(transformSearchPayload(jsonData)).toEqual(expectedXmlString);
    });

    it('should transform valid rooms array', () => {
        const mockedRoomsData = [
            {
                adults: 2,
                kids: 1,
            },
            {
                adults: 3,
                kids: 2,
            },
        ];
        console.log(transformRoomsPayload(mockedRoomsData));
    });
});
