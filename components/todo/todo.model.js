const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    task: {
        type: String,
        require: true,
    },
    statusTask: {
        type: Boolean,
        default: false,
        require: true,
    },
},
    {
        timeseries: true,
    });

module.exports = {
    TodoSchema
}