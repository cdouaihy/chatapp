var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var httpServer = http.createServer(app);
var messages = [];

var myLogStatement = function(req, res, next) {
  console.log("Received", req.method, "request for resource", req.path,
      "from", req.ip);
  next(); // callback to the middleware function
}

app.use(bodyParser.json());
app.use(myLogStatement);

app.post('/newMsg', function(req, res) {
  messages.push(req.body.msg);
  res.send({
    newMessages: messages.slice(req.body.nextIdx),
    nextIdx: messages.length,
    isLastClient: true
  });
});

app.post('/', function(req, res) {
  res.send({
    newMessages: messages.slice(req.body.nextIdx),
    nextIdx: messages.length,
    isLastClient: false
  });
});

app.use(express.static('src'));

httpServer.listen(3000, function(){
  console.log("Listening on port 3000");
});

