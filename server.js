
const express = require('express');
const vhost = require('vhost');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000

const apiApp = require('../api/server').app;
const webApp = require('../webapp/server').app;

//app.use(Incoming);
app.use(vhost('api.*', apiApp));
//.use(vhost('sync.mysite.com', require('/path/to/sync').app))
app.use(vhost('carbon.*', webApp))
app.get('/ping', (req, res) => {
    res.send("Hello, world!");
});
app.listen(PORT);