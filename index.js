var fs    = require('fs');
var Jsonix = require('jsonix').Jsonix;
var Mapping = require('./lib/mapping.js');

var xmlFile = './data/in/source.xml';
var jsonFromXmlFile = './data/out/from-xml.json';
var XmlFromJsonFile = './data/out/from-json.xml';

console.log('#Hello World');
console.log('#read xml document file');
var xmlDocument = fs.readFileSync(xmlFile);

console.log('#output xml document string');
console.log(xmlDocument.toString());

console.log('#instantiate mapping');
var mapping = new Mapping();

console.log('##construct Jsonix context');
// First we construct a Jsonix context - a factory for unmarshaller (parser) 
// and marshaller (serializer) 
var context = new Jsonix.Context(mapping.getModuleArray());

//var context = new Jsonix.Context(mappingArray);  
// Then we create a unmarshaller 
var unmarshaller = context.createUnmarshaller();
// Unmarshal an object from the XML retrieved from the URL 
unmarshaller.unmarshalFile(xmlFile,
    // This callback function will be provided 
    // with the result of the unmarshalling 
    function (unmarshalled) {
        console.log('##read xml document file again to unmarshal a JSON object');
        console.log('##output json object as a string');
        var jsonString = JSON.stringify(unmarshalled);
        console.log(jsonString);
        console.log('##write json object to a file');
        fs.writeFileSync(jsonFromXmlFile, jsonString);
        marshalJsonAsXml();
        done();
    });
    
function marshalJsonAsXml () {
  console.log('##read json object file to marshal as an XML document');
  var jsonObjectBuffer = fs.readFileSync(jsonFromXmlFile);
  var marshaller = context.createMarshaller();
  // Marshal as string
  var objectAsXMLString = marshaller.marshalString(JSON.parse(jsonObjectBuffer.toString()));
  console.log('##output xml string');
  console.log(objectAsXMLString);
  console.log('##write xml marshalled from json object file');
  fs.writeFileSync(XmlFromJsonFile, objectAsXMLString);
}

function done() {
  console.log('#done');
}


