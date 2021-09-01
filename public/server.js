const fs = require('fs');
var dbDataBuffer = fs.readFileSync('./public/db.json', 'utf-8');
var dbJSON = dbDataBuffer.toString();

const express = require('express');
const app = express();

const cors = require('cors');
const corsOptions = {
  origin: '*',
  Credential: true,
  optionSuccessStatus: 200,
};

const PORT = 5000;
app.use(cors(corsOptions));
app.use(express.json());

app.post('/todo', (req, res) => {
  console.log('post\t/todo');
  try {
    const todo = req.body;
    let arr = new Array();
    let temp = JSON.parse(dbJSON).todos;
    arr = temp;
    const now = new Date();
    let newTodo = { id: (temp.length + 1).toString(), isCheck: false, createdAt: now.toISOString() };
    newTodo.content = todo.content;
    arr.push(newTodo);
    const result = JSON.parse(dbJSON);
    result.todos = arr;
    const dataJson = JSON.stringify(result);
    fs.writeFileSync('./public/db.json', dataJson);
    // res.send({ msg: 'success' });
    res.json(dataJson);
  } catch (e) {
    console.log(e);
  }
});

app.post('/todo/:id', (req, res) => {
  console.log('post\t/todo\t change');
  try {
    let id = req.params.id;
    const update = req.body;
    let data = JSON.parse(dbJSON).todos;
    data.forEach((todo) => {
      if (todo.id == id) {
        todo.isCheck = update.isCheck ? update.isCheck : todo.isCheck;
        todo.content = update.content ? update.content : todo.content;
      }
    });
    const newData = new Object();
    newData.todos = data;
    const dataJson = JSON.stringify(newData);
    fs.writeFileSync('./public/db.json', dataJson);
    res.json(dataJson);
  } catch (e) {
    console.log(e);
  }
});

app.get('/todo', (req, res) => {
  console.log('get\t/todo');
  try {
    var dbDataBuffer = fs.readFileSync('./public/db.json', 'utf-8');
    dbJSON = dbDataBuffer.toString();
    res.json(dbJSON);
  } catch (e) {
    console.log('err');
  }
});

app.listen(PORT, () => {
  console.log('something behind, ... you have to implement this ... ! ');
});
