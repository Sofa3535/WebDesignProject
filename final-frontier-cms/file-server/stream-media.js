const fs = require('fs');
const url = require('url');
const path = require('path');

/** @function streamMedia
 * Serves a portion of the requested video file.
 * The video file is embodied in the request url
 * (in the form /videos/{video file name}), and
 * the range of bytes to serve is contained in the
 * request http range header.  See
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range
 * for details.
 * @param {http.incomingRequest} req - the request object
 * @param {http.serverResponse} res - the response object
 */
 
module.exports = function streamMedia(req, res) {
  // Determine the path to the file
  var pathname = url.parse(req.url).pathname;
  var filePath = path.join('public', pathname);
  
  // TODO: steam media
  var match = /bytes=(\d+)-(\d*)/.exec(req.headers.range);
  var start = parseInt(match[1], 10);
  
  
  fs.stat(filePath, (err, stats) => {
  if(err) {
    console.error(err);
    res.statusCode = 404;
    res.end();
    return;
  }
  var end = match[2] ? parseInt(match[2], 10) : stats.size - 1;
 
  res.setHeader("Content-Length", end - start + 1);
  res.setHeader("Accept-Ranges", "bytes");
  res.setHeader("Content-Range", `bytes ${start}-${end}/${stats.size}`);
  res.statusCode = 206;
res.statusMessage = "Partial Content";
var stream = fs.createReadStream(filePath, {start: start, end: end})
      .on('open', () => stream.pipe(res))
      .on('error', (err) => res.end(err));
})  

  
  //Most of these seem to load faster when in
  //Stream-media rather than serve-file
  //Perhaps a coincidence of internet connection?
  switch(path.extname(pathname)){
   case '.html':
   case '.htm':
     res.setHeader('Content-Type', 'text/html');
     break;
   case '.css':
     res.setHeader('Content-Type', 'text/css');
     break;
   case '.js':
     res.setHeader('Content-Type', 'text/javascript');
     break; 
   case '.mp4':
     res.setHeader('Content-Type', 'video/mp4');
     break;
   case '.mov':
     res.setHeader('Content-Type', 'video/mov');
     break;
   case '.wav':
     res.setHeader('Content-Type', 'audio/wav');
     break;
   case '.mp3':
     res.setHeader('Content-Type', 'audio/mpeg');
     break;
   case '.gif':
     res.setHeader('Content-Type', 'image/gif');
     break;
   case '.jpeg':
     res.setHeader('Content-Type', 'image/jpeg');
     break;
   case '.png':
     res.setHeader('Content-Type', 'image/png');
     break;
   case '.pdf':
     res.setHeader('Content-Type', 'application/pdf');
     break;
   case '.ttf':
     res.setHeader('Content-Type', 'font/ttf');
     break;
   case '.woff':
     res.setHeader('Content-Type', 'wont/woff');
     break;          
  default:
    res.setHeader('Content-Type', 'application/octet-stream');
}
}