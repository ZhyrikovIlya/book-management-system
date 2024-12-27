const { addBook, markAsRead, getBooks } = require("./controllers/bookController");

async function main() {
    console.log("Book Management System");

    // Додавання книги
    const book1 = await addBook("The Hobbit", "J.R.R. Tolkien", "Fantasy");
    console.log("Added book:", book1);

    // Позначення книги як прочитаної
    const updatedBook = await markAsRead(book1.id);
    console.log("Marked as read:", updatedBook);

    // Отримання всіх книг
    const books = await getBooks();
    console.log("All books:", books);
}

main().catch(err => console.error(err));
