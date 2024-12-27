const { getBooks, markAsRead, addReview } = require('./controllers/bookController');

async function main() {
    console.log('Book Management System');

    // Отримання всіх книг з books.json
    const books = await getBooks();
    console.log('Books loaded from database:', books);

    // Позначка книги як прочитаної
    const bookToMark = books.find((book) => book.title === 'The Hobbit');
    if (bookToMark) {
        const updatedBook = await markAsRead(bookToMark.id);
        console.log('Marked as read:', updatedBook);
    }

    // Додавання відгуку
    const bookToReview = books.find((book) => book.title === '1984');
    if (bookToReview) {
        const reviewedBook = await addReview(bookToReview.id, 'A chilling dystopian novel.');
        console.log('Added review:', reviewedBook);
    }

    // Фільтрування за жанром
    const fantasyBooks = books.filter((book) => book.genre === 'Fantasy');
    console.log('Fantasy books:', fantasyBooks);

    // Фільтрування за автором
    const tolkienBooks = books.filter((book) => book.author === 'J.R.R. Tolkien');
    console.log('Books by J.R.R. Tolkien:', tolkienBooks);

    // Пошук за назвою
    const searchTitle = '1984';
    const foundBook = books.find((book) => book.title === searchTitle);
    console.log(`Search result for title "${searchTitle}":`, foundBook || 'Not found');
}

main().catch((err) => console.error(err));
