const fs = require('fs');
const path = require('path');
const determineContentType = require('./determine-content-type');
const card = require('./../data/cards.json');
const generateCardHTML = require('./../src/generate-card-html.js');

/** @function serveFile~callback 
 * @param {string|object} error - any error encountered by 
 * serveFile().
 */

/** @module serveFile 
 * Provides a function for serving files in the public 
 * directory matching the supplied filePath
 * @param {string} filePath - the path to the file
 * @param {http.serverResponse} res - the response object
 * @param {serveFile~callback} callback - a callback function 
 * to invoke once the asynchronous process completes.
 */
module.exports = function serveFile(filePath, res, callback) {
  
  // Read the file asynchronously
  fs.readFile(filePath, function(err, body){
    if(err) return callback(err);
    if(filePath == "public/index.html")
    // call the sendHTMl to get HTMl and send to page
    sendHTML(res,callback);
    else{
    // Set the Content-Length
    res.setHeader("Content-Length", body.length);
    
    // Set the Content-Type
    res.setHeader("Content-Type", determineContentType(filePath));
    
    // Serve the file data
    res.end(body);
    }
  });
}


/** @function sendHTML 
 * Provides a function to read the index and push
 * send HTML to the page
 * @param {res} filePath - the path to the file
 * @param {serveFile~callback} callback - a callback function 
 * to invoke once the asynchronous process completes.
 */
function sendHTML(res, callback){
    //Reads in the index file
    fs.readFile("public/index.html", function(err, html) {
    //If it can't read it, return the error
    if(err) return callback(err)
  // TODO: process your html and send the response
  // Call a helper function
    var html = createCardHTML()
    //Set the content-length
    res.setHeader("Content-Length", html.length);
    //set the content-type
    res.setHeader("Content-Type", "text/html");
    //serve the file data
    res.end(html);
});
    return;
}

/** @function createCardHTML 
 * Provides a function for creating the html that will
 * be "pushed" to the index
 * @returns the html as a string
 */
function createCardHTML(){   
    //html to send to index.html
    var all = card.map(function(card){
            return generateCardHTML(card);
               }).join("");
    
   //html to send to index.html
    var html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Assignment 3</title>
             <link href="index.css" type="text/css" rel="stylesheet">
        <head>
        <body>
        <div id="container">
        ${all}
        </div>
          <script type="text/javascript" src="index.js"></script>
        </body>
      <html>
`
    return html;
}

