class Book {
    constructor(id, title, author, genre, isRead = false) {
        this.id = id; // Унікальний ідентифікатор
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.isRead = isRead;
    }
}

module.exports = Book;
