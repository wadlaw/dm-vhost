
const express = require('express');
const vhost = require('vhost');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000

const apiApp = require('../api/server').app;

//app.use(Incoming);
app.use(vhost('api.*', apiApp));
//.use(vhost('sync.mysite.com', require('/path/to/sync').app))
app.use(vhost('carbon.*', function handle (req, res, next) {
    // for match of "foo.bar.example.com:8080" against "*.*.example.com":
    console.log(req.vhost.host) // => 'foo.bar.example.com:8080'
    console.log(req.vhost.hostname) // => 'foo.bar.example.com'
    console.log(req.vhost.length) // => 2
    console.log(req.vhost[0]) // => 'foo'
    console.log(req.vhost[1]) // => 'bar'
    res.send(`Hello from ${req.vhost.hostname}`);
  }))
app.get('/ping', (req, res) => {
    res.send("Hello, world!");
});
app.listen(PORT);