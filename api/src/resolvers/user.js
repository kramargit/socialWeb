module.exports = {
    notes: async (user, args, { models }) => {
        return await models.Note.find({ author: user._id }).sort({ _id: -1 });
    },
    likes: async (user, args, { models }) => {
        return await models.Note.find({ likedBy: user._id }).sort({ _id: -1 });
    }
};