import express = require("express");
import path = require('path');

export function helloWorld(req, res) {
    res.sendFile(path.join(__dirname, `../../web/index.html`));
}