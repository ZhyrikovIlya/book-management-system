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

module.exports = { addBook, markAsRead, getBooks };
