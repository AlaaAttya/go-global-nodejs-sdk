import GoGlobal from './../lib/go-global';

describe('testing GoGlobal SDK class', () => {
    it('test search request', async () => {
        const credentials = {
            soapActionUrl: 'http://www.goglobal.travel/MakeRequest',
            agency: '1520350',
        };
        const goglobal = new GoGlobal(credentials, 'http://xml.qa.goglobal.travel/xmlwebservice.asmx');
        console.log(await goglobal.getHotelClient().search({}));
    });
});