// server.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Routes for books CRUD operations (to be added in Step 3)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Example in-memory data
let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
];

// GET All Books
app.get("/books", (req, res) => {
  res.status(200).json(books);
});

// GET a Single Book by ID
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("The book was not found");
  res.status(200).json(book);
});

// POST a New Book
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author)
    return res.status(400).send("Title and author are required");

  const book = {
    id: books.length + 1,
    title,
    author,
  };
  books.push(book);
  res.status(201).json(book);
});

// PUT Update an Existing Book
app.put("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("The book was not found");

  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;

  res.status(200).json(book);
});

// DELETE a Book
app.delete("/books/:id", (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("The book was not found");

  books.splice(index, 1);
  res.status(204).send();
});
