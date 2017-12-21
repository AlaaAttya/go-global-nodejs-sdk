require('./../lib/index');
import axios from 'axios';

describe('testing GoGlobal SDK class', () => {
    it('test search request', async () => {
        // const credentials = {
        //     soapActionUrl: 'http://www.goglobal.travel/MakeRequest',
        //     agency: '1520350',
        // };
        // const goglobal = new GoGlobal(credentials, 'http://xml.qa.goglobal.travel/xmlwebservice.asmx');
        // goglobal.getHotelClient().search({});

        const data = '<?xml version="1.0" encoding="utf-8"?>\n' +
            '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n' +
            '  <soap:Body>\n' +
            '    <MakeRequest xmlns="http://www.goglobal.travel/">\n' +
            '      <requestType>11</requestType>\n' +
            '      <xmlRequest>\n' +
            '    \t&lt;Root&gt;\n' +
            '    \t\t&lt;Header&gt;\n' +
            '    \t\t\t&lt;Agency&gt;1520350&lt;/Agency&gt;\n' +
            '\t\t\t\t&lt;User&gt;DNATRAVEL&lt;/User&gt;\n' +
            '    \t\t\t&lt;Password&gt;GAPHE7EC&lt;/Password&gt;\n' +
            '    \t\t\t&lt;Operation&gt;HOTEL_SEARCH_REQUEST&lt;/Operation&gt;\n' +
            '    \t\t\t&lt;OperationType&gt;Request&lt;/OperationType&gt;\n' +
            '    \t\t&lt;/Header&gt;\n' +
            '    \t\t&lt;Main Version=&quot;1&quot; ResponseFormat=&quot;XML&quot;&gt;\n' +
            '    \t\t\t&lt;CityCode&gt;75&lt;/CityCode&gt;\n' +
            '    \t\t\t&lt;ArrivalDate&gt;2018-01-06&lt;/ArrivalDate&gt;\n' +
            '    \t\t\t&lt;Nights&gt;3&lt;/Nights&gt;\n' +
            '    \t\t\t&lt;HotelName&gt;&lt;/HotelName&gt;\n' +
            '    \t\t\t&lt;SortOrder&gt;1&lt;/SortOrder&gt;\n' +
            '    \t\t\t&lt;MaxResponses&gt;1&lt;/MaxResponses&gt;\n' +
            '    \t\t\t&lt;MaximumWaitTime&gt;30&lt;/MaximumWaitTime&gt;\n' +
            '    \t\t\t&lt;Rooms&gt;\n' +
            '    \t\t\t\t&lt;Room Adults=&quot;1&quot; RoomCount=&quot;1&quot;&gt;&lt;/Room&gt;\n' +
            '    \t\t\t&lt;/Rooms&gt;\n' +
            '    \t\t&lt;/Main&gt;\n' +
            '    \t&lt;/Root&gt;\n' +
            '      </xmlRequest>\n' +
            '    </MakeRequest>\n' +
            '  </soap:Body>\n' +
            '</soap:Envelope>';

        axios.defaults.headers.post['Content-Type'] = 'text/xml';
        axios.post('http://xml.qa.goglobal.travel/xmlwebservice.asmx', data).then((response) => {
            console.log(response);
        }).catch((error) => {
           console.log(error.config);
        });
    });
});