const express = require('express');
const {
    addBook,
    getBooks,
    updateBook,
    deleteBook,
    addReview,
    markAsRead,
} = require('./controllers/bookController');

const app = express();
app.use(express.json());

// Маршрути
app.get('/books', async (req, res) => {
    const books = await getBooks();
    res.json(books);
});

app.post('/books', async (req, res) => {
    try {
        const { title, author, genre } = req.body;
        const book = await addBook(title, author, genre);
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/books/:id', async (req, res) => {
    try {
        console.log('Updating book with ID:', req.params.id, 'Data:', req.body); // Логування
        const updatedBook = await updateBook(parseInt(req.params.id, 10), req.body);
        res.json(updatedBook);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.delete('/books/:id', async (req, res) => {
    try {
        const deletedId = await deleteBook(parseInt(req.params.id, 10));
        res.json({ deletedId });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.post('/books/:id/review', async (req, res) => {
    try {
        const updatedBook = await addReview(parseInt(req.params.id, 10), req.body.review);
        res.json(updatedBook);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/books/:id/markAsRead', async (req, res) => {
    try {
        const updatedBook = await markAsRead(parseInt(req.params.id, 10));
        res.json(updatedBook);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = app;
