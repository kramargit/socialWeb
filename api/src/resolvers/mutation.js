module.exports = {
    newNote: async (parent, args, { models }) => {
        return await models.Note.create({
            theme: args.theme,
            content: args.content,
            author: "Евгений"
        });
    },
    deleteNote: async (parent, { id }, { models }) => {
        try {
            await models.Note.findOneAndRemove({ _id: id });
            return true;
        } catch (err) {
            return false;
        }
    },
    updateNote: async (parent, { id, theme, content }, { models }) => {
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
    }
}
