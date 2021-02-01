const express = require('express');
const homeRouter = express();

homeRouter.get('/', (req, res, next) => {
    res.send('<html><body><h1>You are at "/"</h1></body></html>');
});

module.exports = homeRouter;