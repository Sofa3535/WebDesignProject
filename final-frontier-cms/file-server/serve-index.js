const fs = require('fs');
const path = require('path');
const serveFile = require('./serve-file');

/** @function serveIndex~callback 
 * @param {string|object} error - any error encountered by 
 * serveIndex().
 */

/** @module serveIndex
 * Serves the provided index.html file or generates 
 * a dynamic listing of a directory's contents
 * @param {string} dirPath - the path to the directory
 * @param {http.serverResponse} res - the response object
 * @param {serveIndex~callback} callback - the callback to 
 * invoke once execution finishes
 */
module.exports = function serveIndex(dirPath, res, callback) {
    //calls the serveFile function to serve the index.html file
  serveFile(path.join(dirPath, 'index.html'), res, function(err) {
      //if it errors, call serveIndexListing
    if(err) serveIndexListing(dirPath, res, callback);
  });
}

/** @callback serveIndexListing~callback
 * @param {string|object} err - any error that occurred 
 */

/** @function serveIndexListing()
 * Serves a HTML list of directory contents 
 * @param {string} directoryPath - the path to the directory 
 * @param {http.serverResponse} res - the repsonse object
 * @param {serveIndexListing~callback} callback - a callback to 
 * invoke once execution finishes.
 */
function serveIndexListing(dirPath, res, callback) {
    //call helper function to create html for index page
  generateIndexHTML(dirPath, function(err, html) {
      //if errors, return
    if(err) return callback(err); 
    // Serve html
    // set content type
    res.setHeader("Content-Type", "text/html");
      //set content length
    res.setHeader("Content-Length", html.length);
      //serve file data
    res.end(html);
  });
}

/** @callback generateIndex~callback
 * @param {string|object} error - the error (if any)
 * @param {string} html - the directory listing as HTML text
 */

/** @function generateIndex 
 * Generates a HTML page listing the contents
 * of a directory. 
 * @param {string} dirPath - the path to the directory 
 * @param {generateIndex~callback} callback - a callback to invoke 
 * once execution completes.
 */
function generateIndexHTML(dirPath, callback) {
    //read the directory
  fs.readdir(dirPath, function(err, items){
      //if it errors, return thee error
    if(err) return err;
    
    // Create Links
    var links = items.map(function(item) {
      return `>${item}>`;
    });
    
    // Generate HTML
    var html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Index of ${dirPath}</title>
        <head>
        <body>
          <h1>Index of ${dirPath}</h1>
          <ul>
            ${links.join("")}
          <ul>
        </body>
      <html>
    `


    // Invoke callback
    callback(null, html);
  });
}



