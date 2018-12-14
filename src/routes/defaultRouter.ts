import express = require("express");

export class DefaultRouter {
    
    public router = express.Router();

    public calculatorRouter = express.Router();
    constructor() {
        this.router.get('/', this.helloWorld);
        this.calculatorRouter.get('/calc/:first/:second', this.calculate);
    }


    private calculate(req, res) {
        let result: any = req.params;
        result.sum = Number(req.params.first) + Number(req.params.second);
        res.status(200).json(result);
    }

    private helloWorld (req, res) {
        res.json({
            message: 'hello world!'
        });
    }
}