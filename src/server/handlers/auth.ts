import express = require('express');
import path = require('path');

export function auth(req: express.Request, res: express.Response) {
        console.log(JSON.stringify(req.body));
        if(req.body.name === 'dyj' || req.body.name === 'claire'){
            res.sendFile(path.join(__dirname, `../../web/view/hello.html`));
        }
        else{
            res.sendFile(path.join(__dirname, `../../web/view/welcome.html`));
        }
        
    }