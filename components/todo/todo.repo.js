const model = require('./todo.model');
const mongoose = require('mongoose');

const Todo = mongoose.model('TodoScema', model);

function getCase(userId) {}
