const express = require('express');
const Book = require('../models/book');

const router = express.Router();

// Index Route
router.get('/', (req, res) => {
  Book.find({}, (err, books) => {
    if (err) {
      console.error(err);
      res.redirect('/');
    } else {
      res.render('books/index', { books });
    }
  });
});

// New Route
router.get('/new', (req, res) => {
  res.render('books/new');
});

// Create Route
router.post('/', (req, res) => {
  Book.create(req.body, (err, book) => {
    if (err) {
      console.error(err);
      res.redirect('/books/new');
    } else {
      res.redirect(`/books/${book._id}`);
    }
  });
});

// Show Route
router.get('/:id', (req, res) => {
  Book.findById(req.params.id, (err, book) => {
    if (err) {
      console.error(err);
      res.redirect('/books');
    } else {
      res.render('books/show', { book });
    }
  });
});

// Edit Route
router.get('/:id/edit', (req, res) => {
  Book.findById(req.params.id, (err, book) => {
    if (err) {
      console.error(err);
      res.redirect(`/books/${req.params.id}`);
    } else {
      res.render('books/edit', { book });
    }
  });
});

// Update Route
router.put('/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, (err, book) => {
    if (err) {
      console.error(err);
      res.redirect(`/books/${req.params.id}/edit`);
    } else {
      res.redirect(`/books/${req.params.id}`);
    }
  });
});

// Delete Route
router.delete('/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/books');
  });
});

module.exports = router;
