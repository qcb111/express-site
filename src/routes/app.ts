import express = require("express");
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
        this.app.listen(port, ()=>console.log(`server listening on port ${port}`));
    }

    registerRoutes(): any {
        this.app.use('/', this.defaultRouter.router);
    }
    registerMiddleware(): any {
        this.app.use(this.accessControl.addHeaders);
    }


}

export default new ExpressApp().app;