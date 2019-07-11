const fs = require('fs');

/** @function serveGallery 
 * Serves a gallery page displaying all images
 * in the public/images folder.
 * @param {http.incomingMessage} req - the request object 
 * @param {http.serverResponse} res - the response object
 */
module.exports = function serveAudio(req, res) {

             
    // Generate an HTML snippet containing <img> elements 
    // for each file in public/images/
//     var imageElements = filenames.map(function(filename) {
//       return `<img src="images/${filename}" alt="${filename}"/>`
//     }).join("");        
  
    // Generate the page HTML
    var html = `
      <!DOCTYPE html>
      <head>
        <title>Image Gallery</title>
        <link href="gallery.css" rel="stylesheet" type="text/css">
      </head>
      <body>
        <h1>Image Gallery</h1>
        <div class="gallery">
          ${imageElements}
        </div>
     <form enctype="form-data" action="/upload" method="POST">
            <label for="image">Audio File:</label>
            <input name="audio" type="file" required>
            <input type="text" name="title" value="Title...">
            <input type="submit" value="upload">
        </form>
<textarea rows="4" cols="50" name="comment" form="usrform">
Enter text here...</textarea>
      </body>
    `
    
    // Serve the page 
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", html.length);
    res.end(html);
  });
}
