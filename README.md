#Getting Started
##Project Set-Up
  * Requirement: Node and Node Package Manager (NPM) instances.
  
  1. Copy files to an empty project folder.
  2. Open a terminal session in the project folder.
  3. Install dependencies:
```
    npm install
```
##Run Test
```
    node index.js
```
The test performs the following steps:

  1. XML document file is read and output.
  2. Same XML document file is read again and unmarshaled, creating a JSON object.
  3. JSON object is output as a string.
  4. Same JSON object string is written to a file.
  5. JSON document file is read and unmarshaled, creating a new JSON object.
  6. New JSON object is marshaled as a new XML document.
  7. New XML document is output.
  8. New XML document is written to a file.

The JSON and XML file artifacts produced by a test run are expected to meet the following criteria:

  1. Both files should validate against schema.
  2. The same data structures and values should exist in both the new XML document and source XML document file.
    * Some declaration and formatting differences are expected such as where a namespace is declared, the label given to a namespace prefix, and missing in-line comments.
  
#Jsonix
[Jsonix (JSON interfaces for XML)](https://github.com/highsource/jsonix) is a JavaScript library that generates and processes mappings between JavaScript objects and their serialized XML representations.  The mappings are declarative and facilitate the bi-directional transformation of JSON and XML object serializations.  

##Object Mappings and JSON Schema
The JavaScript object mappings are generated from XML Schema by the [Jsonix Schema Compiler](https://github.com/highsource/jsonix-schema-compiler):  
```
    /--------------\
    |  XML Schema  |
    \--------------/
            |  
            V
       /--------\
      /   JAXB   \
      \----------/
              |
              V
           /----------\
          /   Jsonix   \
         /    Schema    \
        /    Compiler    \
        \----------------/
                |   \
                |    \---------\
                |              |
                V              V
          /-----------\    /---------------\
          |  Object   |    |  JSON Schema  |
          |  Mapping  |    \---------------/
          \-----------/   
```
###Object Mappings
The Jsonix Schema Compiler is based on [XJC (Java™ Architecture for XML Binding (JAXB) Binding Compiler)](https://jaxb.java.net/2.2.4/docs/xjc.html).  XJC is typically used to generate Java classes from XML data components described by XML Schema.  However, Jsonix uses XJC to generate Jsonix mappings rather than Java classes.  The Jsonix mappings are JavaScript structures used in Jsonix JSON and XML transformations.

####Binding Customization
The process of generating Jsonix mappings binds Jsonix mappings to XML Schema.  The binding process may be customized by one or more XJC binding configuration files.  The file contains XJC and Jsonix Schema Compiler XJC extension data constructs with values that direct the binding process.  For example, XML Schema dependencies may be declared to optimize the process and output of mapping files, and transformations may be defined to resolve object naming conflicts.

###JSON Schema
The Jsonix Schema Compiler may also be used to generate JSON Schema.  JSON Schema may be used to validate instances.

##Format Transformations
Format transformations are performed by the Jsonix library in accordance to object mappings.  A transformation from XML to JSON takes place by directing Jsonix to unmarshal an XML serialization as a Javascript object, and then marshal the Javascript object as a JSON serialization.  The opposite occurs when transforming from JSON to XML.

The following depicts the transformation workflow:
```
       /--------------\
       |  XML format  |
       \--------------/
              ^
              |
              v
       /--------------\                             /-----------\
      /   JavaScript   \       /-------------\      |  Object   |
     /   Transformer    \ ---> |  jsonix.js  | ---> |  Mapping  |
     \------------------/      \-------------/      \-----------/
              ^         
              |
              v
      /---------------\  
      |  JSON format  |  
      \---------------/
```
#Authoritative Sources

The authoritative and complete work is maintained on [GitHub](https://github.com/gmoyanollc/x-to-y-n-back).
