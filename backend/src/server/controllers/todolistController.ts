import express = require("express");
import fs = require('fs'); 
import {TodoItem} from '../models/todolist';

const file = `./data/todolist.json`;
class TodolistController {
    public path = '/todolist';
    public router = express.Router();
    
    private list: TodoItem[] = [
        {
            content: 'Learn German!',
            isFinished: false
        }
    ];
   
    constructor() {
      this.intializeRoutes();
      if(fs.existsSync(file)){
          let fileContent = fs.readFileSync(file, 'utf8');
          this.list = JSON.parse(fileContent);
      } else {
          this.list = [];
      }
    }
   
    public intializeRoutes() {
      this.router.get(this.path, this.getList);
      this.router.put(this.path, this.addItem);
      this.router.delete(`${this.path}/:content`, this.removeItem);
    }
   
    getList = (request: express.Request, response: express.Response) => {
      response.status(200).json(this.list);
    };
   
    addItem = (request: express.Request, response: express.Response) => {
      const item: TodoItem = request.body;
      this.list.push(item);
      fs.writeFileSync(file, JSON.stringify(this.list));
      response.status(201).json(item);
    };

    removeItem = (req: express.Request, res: express.Response) => {
        const con = req.params.content;
        this.list = this.list.filter((item)=>item.content!=con);
        fs.writeFileSync(file, JSON.stringify(this.list));
        res.status(200).json(this.list);
    }
  }
   
  export default TodolistController;
  