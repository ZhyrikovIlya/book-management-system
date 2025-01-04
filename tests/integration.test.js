const request = require('supertest');
const app = require('../src/server');
const fs = require('fs/promises');

jest.mock('fs/promises');

const mockBooks = [
    { id: 1, title: 'Book 1', author: 'Author 1', genre: 'Genre 1', isRead: false, reviews: [] },
    { id: 2, title: 'Book 2', author: 'Author 2', genre: 'Genre 2', isRead: false, reviews: [] },
];

beforeEach(() => {
    fs.readFile.mockResolvedValue(JSON.stringify(mockBooks));
    fs.writeFile.mockResolvedValue();
});

describe('Integration Tests', () => {
    test('GET /books should return all books', async () => {
        const res = await request(app).get('/books');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(mockBooks);
    });

    test('POST /books should add a new book', async () => {
        const newBook = { title: 'New Book', author: 'New Author', genre: 'New Genre' };
        const res = await request(app).post('/books').send(newBook);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id', 3); // ID генерується динамічно
        expect(res.body.title).toBe(newBook.title);
    });

    test('PUT /books/:id should update an existing book', async () => {
        const updatedFields = { title: 'Updated Title' };
        const res = await request(app).put('/books/1').send(updatedFields);
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe(updatedFields.title);
    });

    test('DELETE /books/:id should delete a book', async () => {
        const res = await request(app).delete('/books/1');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('deletedId', 1);
    });

    test('POST /books/:id/review should add a review to a book', async () => {
        const res = await request(app).post('/books/2/review').send({ review: 'Amazing!' });
        expect(res.statusCode).toBe(200);
        expect(res.body.reviews).toContain('Amazing!');
    });

    test('POST /books/:id/markAsRead should mark a book as read', async () => {
        const res = await request(app).post('/books/1/markAsRead');
        expect(res.statusCode).toBe(200);
        expect(res.body.isRead).toBe(true);
    });
});
