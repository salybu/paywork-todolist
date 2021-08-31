const fs = require('fs');
let dbDataBuffer = fs.readFileSync('./public/db.json', 'utf-8');
let dbJSON = dbDataBuffer.toString();

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

app.get('/todo', (req, res) => {
  console.log('get\t/todo');
});

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
    res.send({ msg: 'success' });
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log('something behind, ... you have to implement this ... ! ');
});
