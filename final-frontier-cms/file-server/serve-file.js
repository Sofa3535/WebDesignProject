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
    
    sendHTML(res,callback);

      //Commented these out for this assignment because they were throwing an error
      //"cant set header after it's already been set"
    // Set the Content-Length
    //res.setHeader("Content-Length", body.length);
    
    // Set the Content-Type
    //res.setHeader("Content-Type", determineContentType(filePath));
    
    // Serve the file data
    //res.end(body);
    
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
    
    var html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Practice Audio</title>
            <link rel="stylesheet" type="text/css" href="public/index.css">
        <head>
        <body>
          ${generateCardHTML(card[0])}
        ${generateCardHTML(card[1])}
        ${generateCardHTML(card[2])}
        ${generateCardHTML(card[3])}
        ${generateCardHTML(card[4])}
        ${generateCardHTML(card[5])}
        <script src="index.js"></script>
        </body>
      <html>
`
    return html;
}

// function serveCardIndex(res, callback){
//     var html = createCardHTML()
//     res.setHeader("Content-Length", html.length);
//     res.setHeader("Content-Type", "text/html");
//     res.end(html);
//     }