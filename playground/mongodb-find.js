const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

  // Check that the server is online
  if(err) {
    return console.log('Unable to connect to the server');
  }
  console.log('Connected to the MongoDB server');

  const db = client.db('TodoApp');

  db.collection('Todos').find({}).toArray()
    .then(() => {
    console.log('Todos:');
    console.log(JSON.stringify(docs, undefined, 2));

  }, (err) => {
    console.log('Unable to get Todos');
  });


  // client.close();
});
