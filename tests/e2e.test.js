const request = require('supertest');
const app = require('../src/server');
const fs = require('fs/promises');

jest.mock('fs/promises');

// Ініціалізація мок-файлу
let mockBooks;

beforeEach(() => {
    mockBooks = [
        { id: 1, title: 'Book 1', author: 'Author 1', genre: 'Genre 1', isRead: false, reviews: [] },
        { id: 2, title: 'Book 2', author: 'Author 2', genre: 'Genre 2', isRead: false, reviews: [] },
    ];

    fs.readFile.mockImplementation(() => {
        return Promise.resolve(JSON.stringify(mockBooks));
    });

    fs.writeFile.mockImplementation((_, data) => {
        mockBooks = JSON.parse(data); // Оновлюємо стан мок-файлу
        return Promise.resolve();
    });
});

describe('E2E Tests', () => {
    test('Create a new book and validate the flow', async () => {
        // Створення нової книги
        const newBook = { title: 'New Book', author: 'New Author', genre: 'New Genre' };
        const createResponse = await request(app).post('/books').send(newBook);
        expect(createResponse.statusCode).toBe(201);
        expect(createResponse.body.title).toBe(newBook.title);

        const createdBookId = createResponse.body.id;
        console.log('Created Book ID:', createdBookId); // Логування

        // Оновлення створеної книги
        const updatedFields = { title: 'Updated Book Title' };
        const updateResponse = await request(app).put(`/books/${createdBookId}`).send(updatedFields);
        expect(updateResponse.statusCode).toBe(200);
        expect(updateResponse.body.title).toBe(updatedFields.title);

        // Додавання відгуку
        const review = { review: 'Great book!' };
        const reviewResponse = await request(app).post(`/books/${createdBookId}/review`).send(review);
        expect(reviewResponse.statusCode).toBe(200);
        expect(reviewResponse.body.reviews).toContain(review.review);

        // Отримання всіх книг
        const getResponse = await request(app).get('/books');
        expect(getResponse.statusCode).toBe(200);
        expect(getResponse.body.length).toBe(mockBooks.length);

        // Видалення книги
        const deleteResponse = await request(app).delete(`/books/${createdBookId}`);
        expect(deleteResponse.statusCode).toBe(200);
        expect(deleteResponse.body.deletedId).toBe(createdBookId);
    });
});
