import express = require("express");
import path = require('path');
import bodyParser = require("body-parser");

import {CommonMiddleware} from './server/common/middleware';
import {DefaultRouter} from './server/routes/defaultRouter';

const port = process.env.PORT || 9090;

class ExpressApp {
    public app: express.Application;
    private middleware: CommonMiddleware;
    private defaultRouters: DefaultRouter;
    constructor() {
        this.app = express();
        this.middleware = new CommonMiddleware();
        this.defaultRouters = new DefaultRouter();
        this.registerStaticFiles();
        this.registerMiddleware();
        this.registerRoutes();        
        this.app.listen(port, () => console.log(`server listening on port ${port}`));
    }

    private registerStaticFiles() {
        this.app.use(express.static(path.join(__dirname, '../web')));
    }

    private registerRoutes(): any {
        this.app.use('/', this.defaultRouters.router);
        this.app.use(this.defaultRouters.calculatorRouter);
        this.app.use(this.defaultRouters.authRouter);
    }
    private registerMiddleware(): any {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(this.middleware.addAccessControlHeaders);
        this.app.use(this.middleware.logRequestInfo);
        this.app.use('/calc/', (req,res,next)=>{console.log('calc'); next();});
    }


}

export default new ExpressApp().app;