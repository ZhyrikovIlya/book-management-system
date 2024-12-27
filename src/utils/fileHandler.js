const fs = require("fs/promises");
const path = require("path");

// Шлях до файлу з даними
const filePath = path.resolve(__dirname, "../../data/books.json");

// Зчитування даних
async function readData() {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading data:", err);
        return [];
    }
}

// Запис даних
async function writeData(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error writing data:", err);
    }
}

module.exports = { readData, writeData };
