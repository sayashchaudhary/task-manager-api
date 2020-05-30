//CRUD

const mongo = require('mongodb');
const mongoClient = mongo.MongoClient;
const ObjectID = mongo.ObjectId;

// const {mongoClient, ObjectId} = require('mongodb');

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// const id = new ObjectID();
// console.log(id.id.length);
// console.log(id.toHexString().length);
// console.log(id.getTimestamp());

mongoClient.connect(connectionUrl, { useUnifiedTopology: true },
    (err, client) => {
        if (err) {
            return console.log('Unable to connect to database')
        }
        const db = client.db(databaseName);

        db.collection('user').deleteMany({
            age: 22
        },).then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err)
        })
    });
