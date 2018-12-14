import express = require("express");
import path = require('path');
import {CommonMiddleware} from '../common/middleware';
import {DefaultRouter} from '../routes/defaultRouter';

const port = 9090;

class ExpressApp {
    public app: express.Application;
    private middleware: CommonMiddleware;
    private defaultRouter: DefaultRouter;
    constructor() {
        this.app = express();
        this.middleware = new CommonMiddleware();
        this.defaultRouter = new DefaultRouter();
        this.registerMiddleware();
        this.registerRoutes();        
        this.registerStaticFiles();
        this.app.listen(port, () => console.log(`server listening on port ${port}`));
    }

    private registerStaticFiles() {
        this.app.use(express.static(path.join(__dirname, '../../assets')));
    }

    private registerRoutes(): any {
        this.app.use('/', this.defaultRouter.router);
        this.app.use(this.defaultRouter.calculatorRouter);
    }
    private registerMiddleware(): any {
        this.app.use(this.middleware.addAccessControlHeaders);
        this.app.use(this.middleware.logRequestInfo);
        this.app.use('/calc/', (req,res,next)=>{console.log('calc'); next();});
    }


}

export default new ExpressApp().app;