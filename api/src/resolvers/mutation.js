const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError,
        ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();

module.exports = {
    newNote: async (parent, args, { models, user }) => {
        if (!user) {
            throw new AuthenticationError('You must be signed in to create a note');
        }

        return await models.Note.create({
            theme: args.theme,
            content: args.content,
            author: mongoose.Types.ObjectId(user.id)
        });
    },
    deleteNote: async (parent, { id }, { models, user }) => {
        if (!user) {
            throw new AuthenticationError('You must be signed in to create a note');
        }

        const note = await models.Note.findById(id);
        if (note && String(note.author) !== user.id) {
            throw new ForbiddenError("You don't have permissions to delete the note");
        }

        try {
            await note.remove();
            return true;
        } catch (err) {
            return false;
        }
    },
    updateNote: async (parent, { id, theme, content }, { models, user }) => {
        if (!user) {
            throw new AuthenticationError('You must be signed in to create a note');
        }

        const note = await models.Note.findById(id);
        if (note && String(note.author) !== user.id) {
            throw new ForbiddenError("You don't have permissions to delete the note");
        }

        return await models.Note.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    theme,
                    content
                }
            },
            {
                new: true
            }
        );
    },
    signUp: async (parent, { username, email, password }, { models }) => {
        //нормализуем имайл
        email = email.trim().toLowerCase();

        //хешируем пароль
        const hashed = await bcrypt.hash(password, 10);

        const existingUser = await models.User.findOne({
            $or: [{ username }, { email }]
        });
        if (existingUser) {
            return 'Запись уже существует';
        } else {
            try {
                const user = await models.User.create({
                    username,
                    email,
                    password: hashed
                });

                //создаем и возвращаем json web token
                return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            } catch (err) {
                console.log(err);
                //если при регистрации возникла проблема выбрасываем ошибку
                throw new Error('Error creating account');
            }
        }
    },
    signIn: async (parent, { username, email, password }, { models }) => {
        if (email) {
            email = email.trim().toLowerCase();
        }

        const user = await models.User.findOne({
            $or: [{ email }, { username }]
        });

        if (!user) {
            throw new AuthenticationError('Error signing in');
        }

        //если пароли не совпадают, выбрасываем ошибку аутентификации
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new AuthenticationError('Error signing in');
        }

        //создаем и возвращаем json web token
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    },
    toggleLike: async (parent, { id }, { models, user }) => {
        if (!user) {
            throw new AuthenticationError();
        }

        let noteCheck = await models.Note.findById(id);
        const hasUser = noteCheck.likedBy.indexOf(user.id);

        if (hasUser >= 0) {
            return await models.Note.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        likedBy: mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        likeCount: -1
                    }
                },
                {
                    new: true
                }
            );
        } else {
            return await models.Note.findByIdAndUpdate(
                id,
                {
                    $push: {
                        likedBy: mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        likeCount: 1
                    }
                },
                {
                    new: true
                }
            );
        }
    }
}
