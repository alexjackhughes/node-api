let express = require('express');
let bodyParser = require('body-parser');
let {ObjectID} = require('mongodb');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();
app.use(bodyParser.json());

/* POST API */
app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  })
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});


app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {

    if(!todos) {
      return res.status(400).send();
    }
    res.send({todos})

  }, (e) => {
    res.status(400).send(e);
  })
});


app.get('/todos/:id', (req, res) => {
  let id = new ObjectID(req.params.id); // cast to object

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(400).send();
    }
    return res.send({todo});

  }, (e) => {
    res.status(400).send(e);
  })
});

app.listen(4000, () => {
  console.log('Server has started on port 4000');
});

module.exports =  {app};
