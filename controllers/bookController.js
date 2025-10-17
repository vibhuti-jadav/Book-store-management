import Book from '../modals/bookModel.js';
import path from 'path';
import fs from 'fs';

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.render('books', { books });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const getAddBook = (req, res) => {
  res.render('addBook');
};

const addBook = async (req, res) => {
  try {
    const { title, author, description, price } = req.body;
    let coverImage = '';

    if (req.file) {
      coverImage = req.file.filename;
    }

    const book = new Book({ title, author, description, price, coverImage });
    await book.save();
    res.redirect('/books');
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const getEditBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send('Book not found');
    res.render('editBook', { book });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const updateBook = async (req, res) => {
  try {
    const { title, author, description, price } = req.body;
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send('Book not found');


    if (req.file) {
      if (book.coverImage) {
        const oldImagePath = path.join('public', 'uploads', book.coverImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      book.coverImage = req.file.filename;
    }

    book.title = title;
    book.author = author;
    book.description = description;
    book.price = price;

    await book.save();
    res.redirect('/books');
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send('Book not found');

    if (book.coverImage) {
      const imagePath = path.join('public', 'uploads', book.coverImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Book.deleteOne({ _id: req.params.id });
    res.redirect('/books');
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

export default {
  getAllBooks,
  getAddBook,
  addBook,
  getEditBook,
  updateBook,
  deleteBook,
};
