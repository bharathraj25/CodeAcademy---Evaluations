const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

let toDoNotes = [{
  'id': 1,
  'name': 'hello',
  'isCompleted': true
}];

const getNote = (id) => {
  let res;
  toDoNotes.forEach(note => {
    // console.log(note.id, id);
    if (note.id == id) {
      res = note;
    }
  });
  return res;
};

const deleteNote = (id) => {
  const intialLength = toDoNotes.length;
  toDoNotes = toDoNotes.filter(note => note.id != id);
  return intialLength - toDoNotes.length == 0 ? -1 : id;
};

const deleteCompletedNote = (isCompleted) => {
  const intialLength = toDoNotes.length;
  toDoNotes = toDoNotes.filter(note => note.isCompleted != isCompleted);
  return intialLength - toDoNotes.length;
};

const getIsCompletedNote = (isCompleted) => {
  let res = [];
  toDoNotes.forEach(note => {
    if (note.isCompleted == Boolean(isCompleted)) {
      res.push(note);
    }
  });

  console.log('RESULT', res);
  return res;
};

app.get('/', (req, res) => {
  res.send('Wellcome to your ToDo list!');
});

app.get('/tasks', (req, res) => {
  const q = req.query;
  // console.log(q);
  if (Object.keys(q).length) {
    if (q.isCompleted) {
      res.send(200, { result: getIsCompletedNote(q.isCompleted) });
    }
    else {
      res.send(400, { message: 'Wrong query' });
    }
  }
  else {
    res.send(200, { result: toDoNotes });
  }
});

app.get('/tasks/:id', (req, res) => {
  const id = req.params.id;
  res.send(200, { result: getNote(id) });
});

app.post('/tasks', (req, res) => {
  console.log(req.body);
  let id = toDoNotes.length + 1;
  const newNote = {
    ...req.body,
    id,
    'isCompleted': false
  };
  toDoNotes.push(newNote);
  res.send(201, { result: newNote });
});

app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;

  let index = deleteNote(id);

  index != -1 ?
    res.send(204, { result: index }) :
    res.send(404, { message: 'Not Found' });
});

app.delete('/tasks', (req, res) => {
  const q = req.query;

  if (Object.keys(q).length && q.isCompleted) {
    const count = deleteCompletedNote(q.isCompleted);
    res.send(204, { result: `Deleted ${count} notes` });
  }
  else {
    res.send(400, { message: 'Wrong query' });
  }

});

app.listen(port, () => {
  console.log(`ToDo app listening on port ${port}`);
});