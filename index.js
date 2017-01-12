var fs    = require('fs');
var Jsonix = require('jsonix').Jsonix;

var xmlFile = 'file.xml';
var json-from-xml-file = 'file-from-xml.json';
var xml-from-json-file = 'file-from-json.xml';

console.log('#Hello World');
console.log('#load mappings');
// gCOMMENT mappings go here
//var [module-1] = require('./mapping/[module-1].js').[module-1];
//var [module-2] = require('./mapping/[module-2].js').[module-2];
console.log('#read xml document file');
var xmlDocument = fs.readFileSync(xmlFile);

console.log('#output xml document string');
console.log(xmlDocument.toString());

console.log('##construct Jsonix context');
// First we construct a Jsonix context - a factory for unmarshaller (parser) 
// and marshaller (serializer) 
// gCOMMENT context goes here
//var context = new Jsonix.Context([[module-1], [module-2]]);
 
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
        fs.writeFileSync(json-from-xml-file, jsonString);
        marshalJsonAsXml();
        done();
    });
    
function marshalJsonAsXml () {
  console.log('##read json object file to marshal as an XML document');
  var jsonObjectBuffer = fs.readFileSync(json-from-xml-file);
  var marshaller = context.createMarshaller();
  // Marshal as string
  var objectAsXMLString = marshaller.marshalString(JSON.parse(jsonObjectBuffer.toString()));
  console.log('##output xml string');
  console.log(objectAsXMLString);
  console.log('##write xml marshalled from json object file');
  fs.writeFileSync(xml-from-json-file, objectAsXMLString);
}

function done() {
  console.log('#done');
}


