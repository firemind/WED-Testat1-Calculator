var http = require("http");
var fs = require('fs');
var util = require('util');
var path = require('path');
var qs = require('querystring');

extensions = {
  ".html" : "text/html",
  ".css" : "text/css",
  ".js" : "application/javascript",
  ".png" : "image/png",
  ".gif" : "image/gif",
  ".jpg" : "image/jpeg"
};


serveFile = function(fileName, response){
  if(fileName == './index.html' || fileName == './'){
    fileName = './calc.html';
  }
  fs.exists(fileName, function (exists) {
    if(exists){
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
      });
    }else{
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("File not found");
      response.end();
    }
  });
}

makeCalculation = function(calc){
  if(calc.match(/^[0-9+-\/\*]*$/)){
    try {
      result = eval(calc);
    }catch(err){
      console.log(err);
      result = "ERROR";
    }
  }else{
    result = "not allowed";
  }
  //console.log(result);
  return ""+result;
}

http.createServer(function(request, response) {
  console.log("Request for "+request.url);
  if(request.url == "/calculate" && request.method == 'POST'){
    var body = '';
    request.on('data', function (data) {
        body += data;

        if (body.length > 1e6)
            request.connection.destroy();
    });
    request.on('end', function () {
        var post = qs.parse(body);
        result = makeCalculation(post['calc'], response);
        response.writeHead(200, {"Content-Type":"text/plain" });
        response.write(result);
        response.end();
    });
  }else{
    serveFile("."+request.url, response);
  }
}).listen(8888);
