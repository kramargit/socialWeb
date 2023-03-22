// Запросим библиотеку mongoose
const mongoose = require('mongoose');

// Определяем схему БД заметки
const noteSchema = new mongoose.Schema(
    {
        theme: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        // Присваиваем поля createdAt и updatedAt с типом данных
        timestamps: true
    }
);

// Определяем модель 'Note' со схемой
const Note = mongoose.model('Note', noteSchema);
// Экспортируем модуль
module.exports = Note;