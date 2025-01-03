const fs = require('fs/promises');
const path = require('path');
const filePath = path.resolve(__dirname, '../../data/books.json');
const idTrackerPath = path.resolve(__dirname, '../../data/idTracker.json');

// Зчитування даних книг
async function readData() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading data:', err.message);
    return [];
  }
}

// Запис даних книг
async function writeData(data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing data:', err.message);
  }
}

// Зчитування останнього ID
async function readLastId() {
  try {
    const data = await fs.readFile(idTrackerPath, 'utf-8');
    const parsedData = JSON.parse(data);
    return parsedData.lastId;
  } catch (err) {
    console.error('Error reading last ID:', err.message);
    return 0; // Якщо файл не існує, почнемо з ID 0
  }
}

// Оновлення останнього ID
async function updateLastId(newId) {
  try {
    await fs.writeFile(
      idTrackerPath,
      JSON.stringify({ lastId: newId }, null, 2)
    );
  } catch (err) {
    console.error('Error updating last ID:', err.message);
  }
}

module.exports = { readData, writeData, readLastId, updateLastId };
