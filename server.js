var messages = ["this is a message","this is also a message"];

var onRequest = function(request, response) {
	console.log(request.method);
	response.writeHead(200, {
	'Connection': 'close',
	'Content-type': 'text/html',
	'Access-Control-Allow-Origin': '*'
	});

	if (request.method == 'GET'){
		response.end(JSON.stringify(messages));
	} else if (request.method == 'POST') {

		   var postData = '';
		   var chunkNumber = 1;
		   request.on('data', function(chunk) {
		    postData += chunk.toString();
		    console.log ("chunking 1:" + postData + "/n/n/n/n/n");
		    chunkNumber++;
		   });
		   request.on('end', function() {
		    console.log("Got POST data:");
		    console.log(JSON.parse(postData));
		    messages.push(postData.messages);
		    response.end(JSON.stringify("you did it!"))
		});
	}

	else{
	response.end("use get request method" + "instead of the" + request.method + "method!");
	};
};

http = require('http');
var port = 11000;
http.createServer(onRequest).listen(11000);
console.log("listening on port" + port);