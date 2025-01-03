const {
  addBook,
  markAsRead,
  getBooks,
  addReview,
  updateBook,
  deleteBook,
} = require('../src/controllers/bookController');
const fs = require('fs/promises');

// Мок файлу для тестів
jest.mock('fs/promises');

// Дані для тестів
const mockBooks = [
  {
    id: 1,
    title: 'Test Book 1',
    author: 'Author 1',
    genre: 'Genre 1',
    isRead: false,
    reviews: [],
  },
  {
    id: 2,
    title: 'Test Book 2',
    author: 'Author 2',
    genre: 'Genre 2',
    isRead: false,
    reviews: ['Excellent!'],
  },
];

// Загальні налаштування
beforeEach(() => {
  fs.readFile.mockResolvedValue(JSON.stringify(mockBooks));
  fs.writeFile.mockResolvedValue();
});

describe('BookController', () => {
  test('addBook: should add a new book and return it', async () => {
    const newBook = await addBook('New Title', 'New Author', 'New Genre');
    expect(newBook).toHaveProperty('id', 3); // ID має бути наступним
    expect(newBook.title).toBe('New Title');
    expect(fs.writeFile).toHaveBeenCalled();
  });

  test('markAsRead: should mark a book as read', async () => {
    const updatedBook = await markAsRead(1);
    expect(updatedBook.isRead).toBe(true);
    expect(fs.writeFile).toHaveBeenCalled();
  });

  test('getBooks: should return all books', async () => {
    const books = await getBooks();
    expect(books).toEqual(mockBooks);
  });

  test('addReview: should add a review to a book', async () => {
    const updatedBook = await addReview(2, 'Great addition!');
    expect(updatedBook.reviews).toContain('Great addition!');
    expect(fs.writeFile).toHaveBeenCalled();
  });

  test('updateBook: should update the fields of a book', async () => {
    const updatedBook = await updateBook(1, { title: 'Updated Title' });
    expect(updatedBook.title).toBe('Updated Title');
    expect(fs.writeFile).toHaveBeenCalled();
  });

  test('deleteBook: should delete a book by ID', async () => {
    const deletedId = await deleteBook(1);
    expect(deletedId).toBe(1);
    expect(fs.writeFile).toHaveBeenCalled();
  });

  test('addBook: should throw an error if invalid data is provided', async () => {
    await expect(addBook('', 'Author', 'Genre')).rejects.toThrow(
        "Invalid input: 'title' is required and must be a non-empty string."
    );
  });

  test('markAsRead: should throw an error if book is not found', async () => {
    await expect(markAsRead(999)).rejects.toThrow('Book not found');
  });

  test('addReview: should throw an error if review is invalid', async () => {
    await expect(addReview(1, '')).rejects.toThrow(
        "Invalid input: 'review' is required and must be a non-empty string."
    );
  });
});
