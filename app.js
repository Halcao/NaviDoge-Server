var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(session({
  secret: 'sqwoq%@&^%#&@^&80hskdsjlda.s2i3213^&68276nmxc86%^#(', // 建议使用 128 个字符的随机字符串
  cookie: { maxAge: 60 * 1000 }
}));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "*/*;charset=utf-8");
  next();
});

// parse application/x-www-form-urlencoded
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.json());

app.get('/time', function (req, res) {
  res.send(Date().toLocaleString());
  res.end()
});

app.post('/initial', require('./router/initial.js'));
app.post('/locate', require('./router/locate2.js'));
app.post('/floorplan', require('./router/floorplan.js'));

io.on('connection', function(socket){
  console.log('a user connected');
});
global.io = io;
//app.listen(8080);
http.listen(8080, function(){
  console.log('listening on *:8080');
});
