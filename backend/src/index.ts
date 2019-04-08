import express = require("express");
import path = require('path');
import bodyParser = require("body-parser");

import {CommonMiddleware} from './server/common/middleware';
import {calculate} from './server/handlers/calculator';
import {auth} from './server/handlers/auth';
import {helloWorld} from './server/handlers/hello';
import TodolistController from './server/controllers/todolistController';
const port = process.env.PORT || 9090;

class ExpressApp {
    public app: express.Application;
    private middleware: CommonMiddleware;
    private controllers: any[];
    constructor() {
        this.app = express();
        this.middleware = new CommonMiddleware();
        this.controllers = new Array();
        this.controllers.push(new TodolistController());
        this.registerStaticFiles();
        this.registerMiddleware();
        this.registerEndPoints();        
        this.app.listen(port, () => console.log(`server listening on port ${port}`));
    }

    private registerStaticFiles() {
        this.app.use(express.static(path.join(__dirname, '/web')));
    }

    private registerEndPoints(): any {
        this.app.get('/', helloWorld);
        this.app.get('/calc/:first/:second', calculate);
        this.app.post('/auth', auth);
        this.controllers.forEach(controller => {
            this.app.use('/', controller.router);
        });
    }
    private registerMiddleware(): any {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(this.middleware.addAccessControlHeaders);
        this.app.use(this.middleware.logRequestInfo);
    }


}

export default new ExpressApp().app;