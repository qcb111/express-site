import fs = require('fs');

const repositoryFolder = './data';

class FileRepository<T>{
    private collection: Array<T>;
    private filename: string;

    public constructor(repoName: string) {
        if(!fs.existsSync(repositoryFolder)){
            fs.mkdirSync(repositoryFolder);
        }
        this.filename = `${repositoryFolder}/${repoName}.json`
        if (fs.existsSync(this.filename)) {
            let fileContent = fs.readFileSync(this.filename, 'utf8');
            this.collection = JSON.parse(fileContent);
            console.log(`${this.filename} already exists`)
        } else {
            this.collection = [];
            this.save();
        }

    };

    public insertOne(document: T): void{
        this.collection.push(document);
        this.save();
    };

    public insert(documents: Array<T>): void{
        this.collection = this.collection.concat(documents);
        this.save();
    }

    public get(selector: (doc: T)=>Boolean): Array<T>{
        return this.collection.filter(selector);
    };

    public delete(selector: (doc: T)=>Boolean): number{
        let originCount = this.collection.length;
        this.collection = this.collection.filter(doc=>!selector(doc));
        let currentCount = this.collection.length;
        this.save();
        return originCount - currentCount;
    };

    public update(selector: (doc: T)=>Boolean, newDoc: T): number {
        let changedCount = this.delete(selector);
        for(let i=0;i<changedCount;i++){
            this.collection.push(newDoc);
        }
        this.save();
        return changedCount;
    }

    private save(): void{
        fs.writeFileSync(this.filename, JSON.stringify(this.collection));
        console.log(`${this.filename} saved`);
    }
}

export default FileRepository;