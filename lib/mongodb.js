import {MongoClient} from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
    useNewUrlParser:true,
}

//check if env doesnot has connection string
let client;
let clientPromise;

if(!process.env.MONGODB_URI){
    throw new Error("No mongodb connection string found in .env file");
}

if(process.env.NODE_ENV === 'development'){
    if(!global._mongoClientPromise){
        //if no mongoClient existing then create a new one with the uri and options mentioned above
        client =  new MongoClient(uri,options);
        global._mongoClientPromise = client.connect();
    }clientPromise = global._mongoClientPromise
}else{
    //if the mode is not development then create normally in case of production as there is no scope of presence of any other mongoclient
    client =  new MongoClient(uri,options);
    clientPromise = client.connect();
}

export default clientPromise;