import * as mongoose from 'mongoose';

const url = 'mongodb://localhost:27017';
const dbName = 'qcb';

mongoose.connect(`${url}/${dbName}`, (err) => {
    if(err) {
        console.log(err.message);
    } else {
        console.log('connected!');
    }
});
