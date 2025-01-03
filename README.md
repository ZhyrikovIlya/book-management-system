Опис проекту

**Book Management System** — це система для управління бібліотекою книг. Проект дозволяє додавати, редагувати, видаляти книги, а також фільтрувати, шукати і додавати відгуки до них. Всі дані зберігаються у файлі `books.json`, забезпечуючи простоту роботи з локальною базою даних.

---

### Функціональність

- **Додавання книг**: Створення нової книги з унікальним ID, вказанням назви, автора та жанру.
- **Редагування інформації про книгу**: Можливість змінювати назву, автора, жанр та статус прочитання книги.
- **Видалення книг**: Видалення книги з бази даних за унікальним ID.
- **Додавання відгуків**: Додавання текстових відгуків до книги.
- **Фільтрація книг**:
  - За жанром.
  - За автором.
  - За статусом прочитання (прочитані/непрочитані).
- **Пошук книг**:
  - За назвою.
- **Збереження змін**: Всі дії автоматично оновлюють файл `books.json`.

---

### Інструкція зі встановлення

1. **Клонування репозиторію**  
   Скопіюйте проект з GitHub на свій комп'ютер:
   ```bash
   git clone https://github.com/your-username/book-management-system.git
   cd book-management-system
   ```
2. **Встановлення залежностей**
   Переконайтеся, що у вас встановлений Node.js. Потім виконайте:
   ```bash
   npm install
   ```
3. **Запуск програми**
   Запустіть головний файл проекту:
   ```bash
   node src/index.js
   ```
4. **Запуск тестів**
   Якщо у вас налаштовано тестування через Jest, запустіть:

   ```bash
   npm test

   ```

---

### Приклади використання

1. **Додавання книгb**:

- У коді викликається функція addBook з параметрами: назва, автор, жанр.
- Результат: книга додається до books.json з унікальним ID.

2. **Оновлення книги**

- Використовуйте updateBook, щоб оновити, наприклад, статус прочитання книги:
  ```bash
  await updateBook(1, { isRead: true });
  ```

3. **Видалення книги**

- Видалення книги за ID:
  ```bash
  await deleteBook(3);
  ```

4. **Пошук та фільтрація**

- Шукайте книги за назвою або фільтруйте за жанром:

  ```bash
  const foundBooks = books.filter(book => book.genre === 'Fantasy');

  ```

---

### Структура проекту

book-management-system/

├── src/

│ ├── controllers/

│ │ └── bookController.js

│ ├── models/

│ │ └── Book.js

│ ├── utils/

│ │ └── fileHandler.js

│ └── index.js

├── data/

│ └── books.json

├── tests/

│ └── bookController.test.js

├── package.json

---

### Технології

- **Node.js**: Використовується як основна платформа для виконання коду.
- **Jest**: Для автоматичного тестування (опціонально).
- **JSON**: Використовується для зберігання даних.

---

### Можливі вдосконалення

- Інтеграція з базою даних (наприклад, MongoDB або PostgreSQL).
- Розробка REST API для роботи з клієнтськими додатками.
- Додавання графічного інтерфейсу для управління книгами.

### Автор

Зробив **Жиріков Ілля Ігорович ІС-23** у рамках навчальної дисципліни **Розробка програмного забезпечення на платформі Nоdе.JS**.

---

ЛР2
- Створив пакет
  ```
  npm init -y
- Встановив необхідні залежності
  ```
  npm install --save-dev eslint prettier husky lint-staged jest
- Вибрав стиль коду
Використовував Prettier для форматування та ESLint для перевірки стилю.
Додав файл .prettierrc
  ```
  {
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5"
  }
- Налаштувати форматтер
Додайв скрипт для Prettier у package.json:
  ```
  "scripts": {
  "format": "prettier --write ."
  }
Запустив команду для перевірки форматування
    ```
    npm run format
Успішно
- Налаштував лінтер
Ініціалізував ESLint:
  ```
   npx eslint --init
Інтегрував Prettier з ESLint:
  ```
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```
Оновив .eslintrc.json:
   ```
{
  "extends": ["eslint:recommended", "plugin:prettier/recommended"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```
Налаштував Git-хуки
Встановив необхідних пакетів
Виконав команди:
  ```
npm install --save-dev husky lint-staged
```
2. Ініціалізав Husky
  ```
npx husky install
```
Додав у файл package.json
   ```
"scripts": {
  "prepare": "husky install"
}
```
Створив у директорії .git/hooks файли **pre-commit** та **pre-push**
Для pre-commit:
  ```
npx husky add .husky/pre-commit "npx lint-staged"
```
Для pre-push:
   ```
npx husky add .husky/pre-push "npm test"
```
Все  закомітив під назвою Test commithooks
