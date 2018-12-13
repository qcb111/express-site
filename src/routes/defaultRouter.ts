import express = require("express");

export class DefaultRouter {
    public router = express.Router();

    constructor() {
        this.router.get('/', this.helloWorld);
    }


    private helloWorld (req, res) {
        res.json({
            message: 'hello world!'
        });
    }
}