import express = require("express");

export function calculate (req: express.Request, res: express.Response) {
    let result: any = req.params;
    result.sum = Number(req.params.first) + Number(req.params.second);
    res.status(200).json(result);
};
