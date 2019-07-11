const fs = require('fs');
const vm = require('vm');
const url = require('url');
const querystring = require('querystring');
const dataSource = require('./data-source');
/** @function interpretServerPage() 
 * Serves a server page interpreting its JavaScript and serving
 * the result as HTML
 * @param {string} filePath - the path to the server page file
 * @param {http.incomingMessage} req - Request object
 * @param {http.serverResponse} res - Response object
 */
module.exports = function interpretServerPage(filePath, req, res) {
  // Load the page
  fs.readFile(filePath, {
    encoding: "utf-8"
  }, function(err, body) {
    if(err) {
      // Handle file errors
      console.error(err);
      res.statusCode = 500;
      res.statusMessage = "Server Error";
      res.end();
      return;
    }
    // Helper function to serve HTML responses

    function serve(html) {
      res.setHeader("Content-Type", "text/html");
      res.setHeader("Content-Length", html.length);
      res.end(html);
    }
    try {
      // Initialize the sandbox
      const queryString = url.parse(req.url).query;
      const queryParams = querystring.parse(queryString);
      var sandbox = {
        dataSource: dataSource,
        queryParams: queryParams,
        postParams: req.body || {},
        serve: serve,
        log: console.log()
      }
      // Interpret the page
      vm.runInNewContext(body, sandbox);
    } catch(err) {
      // Handle interpretation errors
      console.error(err);
      res.statusCode = 500;
      res.statusMessage = "Server Error";
      res.end();
    }
  });
}