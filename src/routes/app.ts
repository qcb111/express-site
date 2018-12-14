import express = require("express");
import path = require('path');
import {AccessControl} from '../common/access-control';
import {DefaultRouter} from '../routes/defaultRouter';

const port = 9090;

class ExpressApp {
    public app: express.Application;
    private accessControl: AccessControl;
    private defaultRouter: DefaultRouter;
    constructor() {
        this.app = express();
        this.accessControl = new AccessControl();
        this.defaultRouter = new DefaultRouter();
        this.registerMiddleware();
        this.registerRoutes();        
        this.app.use(express.static(path.join(__dirname, '../../assets')));
        this.app.listen(port, ()=>console.log(`server listening on port ${port}`));
    }

    registerRoutes(): any {
        this.app.use('/', this.defaultRouter.router);
        this.app.use(this.defaultRouter.calculatorRouter);
    }
    registerMiddleware(): any {
        this.app.use(this.accessControl.addHeaders);
        this.app.use('/calc/', (req,res,next)=>{console.log('calc'); next();});
    }


}

export default new ExpressApp().app;