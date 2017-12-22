const GoGlobal = require('./../lib/index');

const credentials = {
    soapActionUrl: 'http://www.goglobal.travel/MakeRequest',
    agency: '1520350',
};
const goglobal = new GoGlobal(credentials, 'http://xml.qa.goglobal.travel/xmlwebservice.asmx');
const data =  goglobal.getHotelClient().search({
    'checkInDate': '',
    'checkoutDate': '',
    'cityId' : '',
    'rooms': [
        {
            'adults': 2,
            'kids': 1
        },
        {
            'adults': 3,
            'kids': 2
        }
    ]

}).then((dd) => {
    console.log(dd);
});
