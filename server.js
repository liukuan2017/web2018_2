var http = require('http');

http.createServer(function (request, response) {
    var content = "";
    response.writeHead(200, {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin":"*"

    });
    request.on('data', function (chunk) {
        content += chunk;
    });
    request.on('end', function () {
        response.write("You've sent: " + content);
        console.log("You've sent: " + content);
        response.end();
    });

}).listen(8080);
console.log("Server has started.");