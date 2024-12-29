class Book {
    constructor(id, title, author, genre) {
        this.id = id; // Унікальний ідентифікатор
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

    // Метод для додавання відгуків
    addReview(review) {
        this.reviews.push(review);
    }
}

module.exports = Book;
