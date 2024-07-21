//booksRoutes.js

const express = require("express");
const router = express.Router();

let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
];

// GET all Books
router.get("/", (req, res) => {
  res.status(200).json(books);
});

router.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) res.status(404).send("The book was not found");
  res.status(200).json(book);
});

router.post("/books", (req, res) => {
  const { title, author } = req.body;
  const book = {
    id: books.length + 1,
    title,
    author,
  };
  books.push(book);
  res.status(201).send(book);
});

router.put("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) res.status(404).send("The book was not found");

  const { title, author } = req.body;
  book.title = title;
  book.author = author;
  res.status(200).send(book);
});

router.delete("/books/:id", (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (index === -1) res.status(404).send("The book was not found");

  books.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
