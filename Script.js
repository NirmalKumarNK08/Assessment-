const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let books = [
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' },
  { id: 3, title: 'Book 3', author: 'Author 3' },
];

// GET
app.get('/books', (req, res) => {
  res.json(books);
});

// POST
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT
app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;
  const index = books.findIndex((book) => book.id == id);
  if (index !== -1) {
    books[index] = { id: parseInt(id), title, author };
    res.json(books[index]);
  } else {
    res.status(404).send('Book not found');
  }
});

// DELETE
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((book) => book.id == id);
  if (index !== -1) {
    books.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Book not found');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
