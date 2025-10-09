const Book = require("../../models/Book");
const httpStatus = require('../../utils/httpStatus');

let addBook = async (req, res) => {
  try {
    const { title, author, description, publishedYear } = req.body;
    if (!title || !author) {
      return res.status(400).json({
        status: httpStatus.FAIL,
        message: "Title and Author are required"
      });
    }

    const book = await Book.create({ title, author, description, publishedYear });
    res.status(201).json({
      status: httpStatus.SUCCESS,
      message: "Book added successfully",
      data: book
    });
  } catch (error) {
    res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message
    });
  }
};

let removeBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({
        status: httpStatus.FAIL,
        message: "Book not found"
      });
    }

    res.status(200).json({
      status: httpStatus.SUCCESS,
      message: "Book removed successfully"
    });
  } catch (error) {
    res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message
    });
  }
};

let getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: books
    });
  } catch (error) {
    res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message
    });
  }
};

let getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        status: httpStatus.FAIL,
        message: "Book not found"
      });
    }

    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: book
    });
  } catch (error) {
    res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message
    });
  }
};

module.exports = {
  addBook,
  removeBook,
  getAllBooks,
  getBook
};
