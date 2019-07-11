
module.exports = function generateAdminHTML(files){
        var links = files.map(function(file) {
      return `>${file}>`;
    });
    var html = `
    <!DOCTYPE html>
      <html>
        <head>
          <title>Admin</title>
        <head>
        <body>
          <h1>Index of Admin</h1>
          <ul>
            ${links.join("")}
          <ul>
        </body>
      <html>
`
}