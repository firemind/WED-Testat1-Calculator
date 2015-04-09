var http = require("http");
var fs = require('fs');
var util = require('util');
var path = require('path');

extensions = {
  ".html" : "text/html",
  ".css" : "text/css",
  ".js" : "application/javascript",
  ".png" : "image/png",
  ".gif" : "image/gif",
  ".jpg" : "image/jpeg"
};

http.createServer(function(request, response) {
  fileName = "."+request.url
  fs.readFile(fileName, function (err, data) {
    if (err != null){
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write("Error");
      response.end();
    }else{
      ext = path.extname(fileName);
      response.writeHead(200, {"Content-Type": extensions[ext]});
      response.write(data);
      response.end();
    }
    //response.write(data);
  });
  //response.write(util.inspect(request));
}).listen(8888);
