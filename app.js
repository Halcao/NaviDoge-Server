var express = require('express');
// 引入 express-session 这个模块
var session = require('express-session');

var app = express();

// TODO: session
// app.use(session({
//   secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
//   cookie: { maxAge: 60 * 1000 }
// }));

// app.get('/', require('./router/root.js'));

app.get('/area', require('./router/area.js'));

app.get('/bssids', require('./router/bssids.js'));

app.listen(8080);
