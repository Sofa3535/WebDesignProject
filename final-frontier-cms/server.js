"use strict";

var http = require('http');
var handleRequest = require('./file-server/handle-request');
var port = 3001;

var server = http.createServer(handleRequest);

server.listen(port, function(){
  console.log("Server is listening on port " + port);
});