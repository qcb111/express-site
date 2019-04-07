import express = require('express');
import path = require('path');

const validNames = ['dyj', 'claire'];

function isPrivate(name: string): boolean{
    let n = name.toLowerCase();
    if(validNames.indexOf(n)>=0){
        return true;
    }
    return false;
}

export function auth(req: express.Request, res: express.Response){
    console.log(JSON.stringify(req.body));
    let name = req.body.name;
    let ret = {
        state: 0
    };
    if (isPrivate(name)) {
        ret.state = 2;
    }
    else {
        ret.state = 1;
    }
    res.status(200).json(ret);
}