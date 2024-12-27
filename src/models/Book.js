class Book {
    constructor(title, author, genre) {
        this.id = Date.now(); // Генеруємо унікальний ID
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.isRead = false;
        this.reviews = [];
    }

    // Метод для позначення книги як прочитаної
    markAsRead() {
        this.isRead = true;
    }

    // Метод для добавления отзыва
    addReview(review) {
        this.reviews.push(review);
    }
}

module.exports = Book;
