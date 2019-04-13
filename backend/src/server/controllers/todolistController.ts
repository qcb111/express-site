import express = require("express");
import fs = require('fs');
import { TodoItem } from '../models/todolist';
import FileRepository from '../common/FileRepository';

const collectionName = `todolist`;
class TodolistController {
    public path = '/todolist';
    public router = express.Router();

    private collection: FileRepository<TodoItem>;


    constructor() {
        this.intializeRoutes();
        this.collection = new FileRepository(collectionName);
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getList);
        this.router.put(this.path, this.addItem);
        this.router.delete(`${this.path}/:content`, this.removeItem);
    }

    getList = (request: express.Request, response: express.Response) => {
        let list = this.collection.get(()=>true);
        response.status(200).json(list);
    };

    addItem = (request: express.Request, response: express.Response) => {
        const item: TodoItem = request.body;
        this.collection.insertOne(item);
        response.status(201).json(item);
    };

    removeItem = (req: express.Request, res: express.Response) => {
        const con = req.params.content;
        let count = this.collection.delete((item) => item.content === con);
        res.status(200).json({deleted: count});
    }
}

export default TodolistController;
