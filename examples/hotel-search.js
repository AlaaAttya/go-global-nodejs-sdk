const GoGlobal = require('./../lib/index');

const credentials = {
    soapActionUrl: 'http://www.goglobal.travel/MakeRequest',
    agency: '1520350',
};
const goglobal = new GoGlobal(credentials, 'http://xml.qa.goglobal.travel/xmlwebservice.asmx');
const data =  goglobal.getHotelClient().search({}).then((dd) => {
    console.log(dd);
});
