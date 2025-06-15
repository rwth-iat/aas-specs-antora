// modules/extensions/rewrite-constraints-ext.js
console.log('Loading rewrite-constraints-ext.js extension...');

function transformConstraints(source, docfile) {
  let transformedSource = source;
  const myString = "some_replacement_string";

  const aasdMatches = (source.match(/^:aasd(\d+):\s*pass:q\[\[underline\]#Constraint AASd-(\d+):#\s*(.*?)\]$/gm) || []);
  if (aasdMatches.length > 0) {
    transformedSource = transformedSource.replace(
      "plantuml::",
      myString
    );
  }
  
  return transformedSource;
}

module.exports = function (registry) {
  console.log('Registering rewrite-constraints-ext...');
  
  registry.preprocessor(function () {
    var self = this;
    self.process(function (doc, reader) {
      var docfile = doc.getAttribute('docfile') || '[unknown file]';
      var source = reader.getString();
      var transformedSource = transformConstraints(source, docfile);
      
      if (source !== transformedSource) {
        var Asciidoctor = require('@asciidoctor/core')();
        var newReader = Asciidoctor.Reader.$new(transformedSource.split('\n'));
        return newReader;
      }
      
      return reader;
    });
  });
  
  console.log('Preprocessor registered successfully');
};  