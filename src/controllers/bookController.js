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

async function searchBooks(query) {
    const books = await readData();
    const lowerCaseQuery = query.toLowerCase();
    return books.filter(book =>
        book.title.toLowerCase().includes(lowerCaseQuery) ||
        book.author.toLowerCase().includes(lowerCaseQuery) ||
        book.genre.toLowerCase().includes(lowerCaseQuery)
    );
}

async function filterBooks({ genre, isRead }) {
    const books = await readData();
    return books.filter(book => {
        let matches = true;
        if (genre) {
            matches = matches && book.genre.toLowerCase() === genre.toLowerCase();
        }
        if (isRead !== undefined) {
            matches = matches && book.isRead === isRead;
        }
        return matches;
    });
}

async function addReview(bookId, review) {
    const books = await readData();
    const book = books.find(b => b.id === bookId);
    if (!book) {
        throw new Error("Book not found");
    }
    book.reviews.push(review);
    await writeData(books);
    return book;
}
