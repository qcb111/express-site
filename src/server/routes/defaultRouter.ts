import express = require("express");
import path = require('path');
export class DefaultRouter {

    public router = express.Router();

    public calculatorRouter = express.Router();
    public authRouter = express.Router();
    constructor() {
        this.router.get('/', this.helloWorld);
        this.calculatorRouter.get('/calc/:first/:second', this.calculate);
        this.authRouter.post('/auth', this.auth);
    }


    private calculate(req, res) {
        let result: any = req.params;
        result.sum = Number(req.params.first) + Number(req.params.second);
        res.status(200).json(result);
    }

    private helloWorld(req, res) {
        res.sendFile(path.join(__dirname, `../../web/index.html`));
    }

    private auth(req: express.Request, res: express.Response) {
        console.log(JSON.stringify(req.body));
        if(req.body.name === 'dyj' || req.body.name === 'claire'){
            res.sendFile(path.join(__dirname, `../../web/view/hello.html`));
        }
        else{
            res.sendFile(path.join(__dirname, `../../web/view/welcome.html`));
        }
        
    }
}