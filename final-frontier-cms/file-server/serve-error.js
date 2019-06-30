/** @function serveError 
 * Logs an error and serves a HTTP response
 * with specified status code.
 * @param {string|object} err - the error 
 * @param {integer} code - the error status code 
 * @param {string} message - the status message
 * @param {http.serverResponse} res - the response object
 */
module.exports = function serveError(err, code, message, res) {
  // Log the error 
  console.error(err);
  // Send the response 
  res.statusCode = code;
  res.statusMessage = getStatusMessage(code);
  res.end();
}