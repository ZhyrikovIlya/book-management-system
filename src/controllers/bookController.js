const { readData, writeData } = require("../utils/fileHandler");
const Book = require("../models/Book");

async function addBook(title, author, genre) {
    const books = await readData();
    const newBook = new Book(Date.now(), title, author, genre);
    books.push(newBook);
    await writeData(books);
    return newBook;
}

async function markAsRead(bookId) {
    const books = await readData();
    const book = books.find(b => b.id === bookId);
    if (!book) {
        throw new Error("Book not found");
    }
    book.isRead = true;
    await writeData(books);
    return book;
}

async function getBooks() {
    return await readData();
}

async function addReview(bookId, review) {
    const books = await readData();
    const book = books.find(b => b.id === bookId);
    if (!book) {
        throw new Error("Book not found");
    }
    if (!book.reviews) {
        book.reviews = [];
    }
    book.reviews.push(review);
    await writeData(books);
    return book;
}

module.exports = { addBook, markAsRead, getBooks, addReview };
