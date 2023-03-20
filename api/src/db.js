//request the mongoose library
const mongoose = require('mongoose');

module.exports = {
    connect: DB_HOST => {
        // Connect to the database
        mongoose.connect(DB_HOST, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Display an error if the connection fails
        mongoose.connection.on('error', err => {
            console.error(err);
            console.log(
                'MongoDB connection error. Please make sure MongoDB is running'
            );
            process.exit();
        });
    },
    close: () => {
        mongoose.connection.close();
    }
};