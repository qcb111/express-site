import {MongoClient, Db} from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'qcb';

class mongo {
    public db: MongoClient;

    constructor() {
        MongoClient.connect(url).then((db)=>{
            this.db = db;
        }).catch(err => {
            console.log(err);
        });
    }

}