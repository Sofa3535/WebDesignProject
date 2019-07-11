const fs = require('fs');
const url = require('url');
const path = require('path');
const serveIndex = require('./serve-index');
const serveFile = require('./serve-file');
const interpretServerPage = require('./interpret-server-page');
const parseBody = require('./parse-body');
const determineUploadType = require('./determine-upload-type');
const serveAdmin = require('./serve-admin');
/** @module handleRequest
 * Provides a function for handling HTTP requests
 * @param {http.incomingMessage} req - the request object
 * @param {http.serverResponse} res - the response object
 */
module.exports = function handleRequest(req, res) {
   
  // Handle requests 
switch(req.method){
  case 'GET':
    handleGetRequest(req, res);
        
    break;
  case 'POST':
    handlePostRequest(req, res);
        
    break;
  default:
    res.statusCode = 501;
    res.statusMessage = "Not Implemented";
    res.end();
}
//   // Determine the resource path and get its stats
//   var pathname = url.parse(req.url).pathname;
//   var filePath = path.join('public', pathname);
//   fs.stat(filePath, function(err, stats) {
//     if(err) {
//       console.error(err);
//       res.statusCode = 404;
//       res.statusMessage = "Not Found";
//       res.end();
//       return;
//     }
//     // Serve the requested resource
//     if(stats.isFile()) {
//       // Is the file a server page?
//       if(path.extname(filePath) === '.nsp') {
//         // Yes: Interpret the server page
//         interpretServerPage(filePath, req, res);
//       } else {
//         // No: Serve the file
// //         if(req.url === "/admin")
            
//         serveFile(filePath, req, res);
//       }
//     } else if(stats.isDirectory()) {
//       // Serve the directory
//       serveIndex(filePath, req, res);
//     } else {
//       res.statusCode = 404;
//       res.statusMessage = "Not Found";
//       res.end();
//     }
//   });
}

/** @function handleGetRequest
 * A helper function to process GET requests 
 * @param {http.incomingMessage} req - the request object 
 * @param {http.serverResponse} res - the response object 
 */
function handleGetRequest(req, res) {
  // Determine the resource path and get its stats
  var pathname = url.parse(req.url).pathname;
  var filePath = path.join('public', pathname);
  fs.stat(filePath, function(err, stats) {
    if(err) {
      console.error(err);
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.end();
      return;
    }
    
    // Serve the requested resource
    if(stats.isFile()) {
      // Is the file a server page?
      if(path.extname(filePath) === '.nsp') {
        // Yes: Interpret the server page
        interpretServerPage(filePath, req, res);
      
      } else {
        // No: Serve the file
        serveFile(filePath, req, res);
      }
    } else if(stats.isDirectory()) {
      // Serve the directory
      if (filePath === "public/admin")
          
        serveAdmin(filePath,res,);
      else
      serveIndex(filePath, req, res);
    } else {
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.end();
    }
    
  });
}

/** @function handlePostRequest
 * A helper function to process POST requests 
 * @param {http.incomingMessage} req - the request object 
 * @param {http.serverResponse} res - the response object 
 */
function handlePostRequest(req, res) {
    // Handle POST request
    if (req.url === "/upload") {
        determineUploadType(req,res);
    } else {
        parseBody(req, res, function(req, res) {
            // Finish processing request
            var pathname = url.parse(req.url).pathname;
            var filePath = path.join('public', pathname);
            interpretServerPage(filePath, req, res);
        });
    }
}
