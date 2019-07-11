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
module.exports = function serveAdmin(dirPath, res) {
    
    //calls the serveFile function to serve the index.html file
  serveFile(path.join(dirPath, 'admin.html'), res, function(err) {
      //if it errors, call serveIndexListing
      
    if(err) serveAdminListing(dirPath, res);
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
function serveAdminListing(dirPath, res) {
    //call helper function to create html for index page
    
    var html = generateAdminHTML(dirPath)
      //if errors, return
        
    //if(err) return; 
    // Serve html
    // set content type
    // 
     
    res.setHeader("Content-Type", "text/html");
      //set content length
    res.setHeader("Content-Length", html.length);
      //serve file data
      
    res.end(html);
      
  
   
    return;
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
function generateAdminHTML(dirPath) {
    //read the directory
  var files = fs.readdirSync("public/admin");


    // Create Links
    var links = files.map(function(file) {
      return `<a href="https://absurd-olympic-3000.codio.io/admin/${file}">${file}</a></br>`;
    });
    
    // Generate HTML
    var html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Index of Admin</title>
        <head>
        <body>
          <h1>Index of Admin</h1>
          <ul>
            ${links}
          <ul>
        </body>
      <html>
    `

return html;
    
    
}



