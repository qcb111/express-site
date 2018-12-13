const express = require('express');
const app = express();
const port = 9090;

app.get('/', (req, res, next) => {
    console.log('hello world!');
    next();
}, function(req, res) {
    res.send('hello from next');
});

var cb0 = function (req, res, next) {
    console.log('CB0')
    next();
}

var cb1 = function (req, res, next) {
    console.log('CB1')
    next();
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
    console.log('the response will be sent by the next function ...')
    next();
}, function (req, res) {
    res.send('Hello from D!')
})

app.listen(port, () => console.log(`listening on port ${port}`));    