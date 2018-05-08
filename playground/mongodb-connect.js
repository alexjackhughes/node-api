const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

  // Check that the server is online
  if(err) {
    return console.log('Unable to connect to the server');
  }
  console.log('Connected to the MongoDB server');

  const db = client.db('TodoApp');

  // Add a Todo to collection
  db.collection('Todos').insertOne({
      text: 'Something to do',
      completed: false
    },(err, result) => {
      if(err) {
        return console.log('Unable to insert todo');
      }
    console.log(JSON.stringify(result.ops, undefined , 2));
  });

  // Add a User to collection
  db.collection('Users').insertOne({
      name: 'Alex Hughes',
      age: 25,
      location: 'Cardiff'
    },(err, result) => {
      if(err) {
        return console.log('Unable to insert user', err);
      }
    console.log(JSON.stringify(result.ops, undefined , 2));
  });

  client.close();
});
