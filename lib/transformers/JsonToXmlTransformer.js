import * as xmlbuilder from 'xmlbuilder';
import htmlencode from 'htmlencode';

/**
 *
 * @type {{transform: (function(Object)), getServiceXml: (function(*=, *=, *=))}}
 *
 * @author Alaa Attya <alaa.attya@tajawal.com>
 */
const json2xml = {
    /**
     * Convert json object to xml
     *
     * @param {Object} jsonData
     * @author Alaa Attya <alaa.attya@tajawal.com>
     */
    transform: (jsonData) => {
        let data = xmlbuilder.create(jsonData).end({ newline: '', separateArrayItems: true, allowEmpty: false });
        data = data.replace('<?xml version="1.0"?>', '');
        return data;
    },
    /**
     *
     * @param {string} xmlString
     *
     * @author Alaa Attya <alaa.attya@tajawal.com>
     */
    encodeXmlRequest: xmlString => htmlencode.htmlEncode(xmlString),
    /**
     *
     * @param {Object} jsonRequestDetails
     *
     * @return {string}
     *
     * @author Alaa Attya <alaa.attya@tajawal.com>
     */
    getServiceXml: (jsonRequestDetails) => {
        let xmlString = json2xml.transform(jsonRequestDetails);
        xmlString = json2xml.encodeXmlRequest(xmlString);
        return `${'<?xml version="1.0" encoding="utf-8"?>\n' +
            '<soap:Envelope\n' +
            '\txmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"\n' +
            '\txmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
            '\txmlns:xsd="http://www.w3.org/2001/XMLSchema">\n' +
            '\t<soap:Body>\n' +
            '\t\t<MakeRequest\n' +
            '\t\t\txmlns="http://www.goglobal.travel/">\n' +
            '\t\t\t<requestType>11</requestType>\n' +
            '\t\t\t<xmlRequest>'}${xmlString}` +
            '\t\t\t</xmlRequest>\n' +
            '\t\t</MakeRequest>\n' +
            '\t</soap:Body>\n' +
            '</soap:Envelope>';
    },

};
export default json2xml;
