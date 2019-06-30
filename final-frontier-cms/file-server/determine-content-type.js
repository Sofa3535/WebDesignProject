const path = require('path');
/** @function determineContentType 
 * Determines the MIME type associated with
 * the provided file path.
 * @param {string} filePath - the file path to evaluate
 */
module.exports = function determineContentType(filePath) {
    // TODO: determine and return content-type
    // 
    switch(path.extname(filePath).toLowerCase()) {
        case '.html':
        case '.htm':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        case '.gif':
            return 'image/gif';
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.pdf':
            return 'application/pdf';
        case '.ttf':
            return 'font/ttf';
        case '.woff':
            return 'wont/woff';
        default:
            return 'application/octet-stream';
    }
}