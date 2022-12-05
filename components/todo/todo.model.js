const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    task: {
        type: String,
        require: true,
    }
});

module.exports = { TodoSchema}