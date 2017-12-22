import { formatJsonData } from './../../../lib/transformers/hotel-search-payload-transformer';

describe('should have valid xml payload', () => {

    it('should have valid json data', () => {
        const searchParam = {
            'checkInDate': '2017-09-11',
            'checkoutDate': '2017-09-15',
            'cityId' : 123,
            'rooms': []
        };

        const credentials = {
            soapActionUrl: 'http://www.goglobal.travel/MakeRequest',
            agency: '1520350',
            username: 'alaa',
            password: '11232342fgtrh',
            apiVersion: 1
        };

        const expectedJsonResult = {
            Root: {
                Header: {
                    Agency: "1520350",
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

        expect(formatJsonData(searchParam, credentials)).toEqual(expectedJsonResult);

    });
});