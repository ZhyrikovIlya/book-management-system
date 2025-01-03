const {
  addBook,
  deleteBook,
  updateBook,
  addReview,
} = require('../src/controllers/bookController');

test('Add a new book', async () => {
  const newBook = await addBook('Test Book', 'Test Author', 'Test Genre');
  expect(newBook).toHaveProperty('id');
  expect(newBook.title).toBe('Test Book');
});

test('Update an existing book', async () => {
  const updatedBook = await updateBook(1, { title: 'Updated Title' });
  expect(updatedBook.title).toBe('Updated Title');
});

test('Delete a book', async () => {
  const deletedId = await deleteBook(1);
  expect(deletedId).toBe(1);
});

test('Add a review to a book', async () => {
  const bookWithReview = await addReview(2, 'Great book!');
  expect(bookWithReview.reviews).toContain('Great book!');
});
