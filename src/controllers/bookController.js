const { readData, writeData } = require("../utils/fileHandler");
const Book = require("../models/Book");

async function addBook(title, author, genre) {
    if (!title || typeof title !== 'string' || title.trim() === '') {
        throw new Error("Invalid input: 'title' is required and must be a non-empty string.");
    }
    if (!author || typeof author !== 'string' || author.trim() === '') {
        throw new Error("Invalid input: 'author' is required and must be a non-empty string.");
    }
    if (!genre || typeof genre !== 'string' || genre.trim() === '') {
        throw new Error("Invalid input: 'genre' is required and must be a non-empty string.");
    }

    const books = await readData();
    const newId = books.length ? Math.max(...books.map((book) => book.id)) + 1 : 1;
    const newBook = new Book(newId, title, author, genre);
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
    if (!review || typeof review !== 'string' || review.trim() === '') {
        throw new Error("Invalid input: 'review' is required and must be a non-empty string.");
    }

    const books = await readData();
    const book = books.find(b => b.id === bookId);
    if (!book) {
        throw new Error("Book not found.");
    }
    book.reviews.push(review);
    await writeData(books);
    return book;
}

async function updateBook(id, updatedFields) {
    const books = await readData();
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
        throw new Error(`Book with ID ${id} not found`);
    }
    books[bookIndex] = { ...books[bookIndex], ...updatedFields };
    await writeData(books);
    return books[bookIndex];
}

async function deleteBook(id) {
    const books = await readData();
    const updatedBooks = books.filter((book) => book.id !== id);
    if (books.length === updatedBooks.length) {
        throw new Error(`Book with ID ${id} not found`);
    }
    await writeData(updatedBooks);
    return id;
}


module.exports = { addBook, markAsRead, getBooks, addReview, updateBook, deleteBook };
