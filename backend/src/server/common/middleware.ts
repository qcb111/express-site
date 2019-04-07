import express = require('express');

export class CommonMiddleware {
    public addAccessControlHeaders = (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        console.log(`Time is:`, new Date());
        next();
    }

    public logRequestInfo (req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log("Request URL: ", req.originalUrl);
        console.log("Request method: ", req.method);
        next();
        console.log(`Response status: ${res.statusCode}`);
    }
}
