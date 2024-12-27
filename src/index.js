const Book = require('./models/Book');

function main() {
    console.log('Book Management System');

    // Створюємо книги
    const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 'Fantasy');
    const book2 = new Book('1984', 'George Orwell', 'Dystopian');
    const book3 = new Book('The Silmarillion', 'J.R.R. Tolkien', 'Fantasy');

    // Список книг
    const books = [book1, book2, book3];
    console.log('Added books:', books);

    // Позначка книги як прочитаної
    book1.markAsRead();
    console.log('Marked as read:', book1);

    // Додавання відгуків
    book1.addReview('A fantastic journey through Middle-earth!');
    book2.addReview('A chilling dystopian novel.');
    book3.addReview('A deep dive into the history of Middle-earth.');

    console.log('Books with reviews:');
    books.forEach((book) => console.log(book));

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

main();
