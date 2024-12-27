const { getBooks } = require('./controllers/bookController');

async function main() {
    console.log('Book Management System');

    // Отримання всіх книг з books.json
    const books = await getBooks();
    console.log('Books loaded from database:', books);

    // Висновок лише прочитаних книг
    const readBooks = books.filter((book) => book.isRead);
    console.log('Marked as read:', readBooks);

    // Виведення книг з відгуками
    const booksWithReviews = books.filter((book) => book.reviews && book.reviews.length > 0);
    console.log('Books with reviews:', booksWithReviews);

    // Фільтрування за жанром
    const fantasyBooks = books.filter((book) => book.genre === 'Fantasy');
    console.log('Books by genre:', fantasyBooks);

    // Фільтрування за автором
    const tolkienBooks = books.filter((book) => book.author === 'J.R.R. Tolkien');
    console.log('Books by specified author:', tolkienBooks);

    // Пошук за назвою
    const searchTitle = '1984';
    const foundBook = books.find((book) => book.title === searchTitle);
    console.log(`Search result for title "${searchTitle}":`, foundBook || 'Not found');
}

main().catch((err) => console.error(err));
