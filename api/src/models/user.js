// Запросим библиотеку mongoose
const mongoose = require('mongoose');

// Определяем схему БД заметки
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            index: { unique: true }
        },
        email: {
            type: String,
            required: true,
            index: { unique: true }
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        // Присваиваем поля createdAt и updatedAt с типом данных
        timestamps: true
    }
);

// Определяем модель 'Note' со схемой
const User = mongoose.model('User', UserSchema);
// Экспортируем модуль
module.exports = User;