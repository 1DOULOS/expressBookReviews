const express = require('express');
const jwt = require('jsonwebtoken');
let books = require('./booksdb.js');
let isValid = require('./auth_users.js').isValid;
let users = require('./auth_users.js').users;
const public_users = express.Router();

public_users.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (isValid(username)) {
    return res.status(409).json({ message: "Username already exists" });
  }

  users.push({ username, password });
  return res.status(201).json({ message: "User successfully registered. Now you can login" });
});

public_users.get('/', (req, res) => {
  return res.status(200).json(books);
});

public_users.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.status(200).json(books[isbn]);
});

public_users.get('/author/:author', (req, res) => {
  const author = req.params.author.toLowerCase();
  const result = {};

  Object.keys(books).forEach(isbn => {
    if (books[isbn].author.toLowerCase().includes(author)) {
      result[isbn] = books[isbn];
    }
  });

  if (Object.keys(result).length === 0) {
    return res.status(404).json({ message: "No books found for this author" });
  }

  return res.status(200).json(result);
});

public_users.get('/title/:title', (req, res) => {
  const title = req.params.title.toLowerCase();
  const result = {};

  Object.keys(books).forEach(isbn => {
    if (books[isbn].title.toLowerCase().includes(title)) {
      result[isbn] = books[isbn];
    }
  });

  if (Object.keys(result).length === 0) {
    return res.status(404).json({ message: "No books found with this title" });
  }

  return res.status(200).json(result);
});

public_users.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.status(200).json(books[isbn].reviews);
});

public_users.delete('/review/:isbn', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: "User not logged in" });
  }

  jwt.verify(token, 'access', (err, user) => {
    if (err) {
      return res.status(403).json({ message: "User not authenticated" });
    }

    const isbn = req.params.isbn;
    const username = user.username;

    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (!books[isbn].reviews[username]) {
      return res.status(404).json({ message: "No review found for this user" });
    }

    delete books[isbn].reviews[username];

    return res.status(200).json({ message: `Review for ISBN ${isbn} posted by user ${username} deleted.` });
  });
});

module.exports.general = public_users;
