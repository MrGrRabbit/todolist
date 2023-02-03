const { request, response } = require("express");
const { TodoSchema } = require("./todo.model");
const mongoose = require("mongoose");
const Schema = mongoose.model("TodoSchema", TodoSchema);

class Todo {
    getListCase = async (request, response) => {
        const todoList = await Schema.find({ userId: request.userId });
        return response.json(todoList);
    }

    createTodo = async (request, response) => {
        try {
            const task = request.body.task;
            const user = request.userId;
            console.log(task, user);
            const todoCreate = new Schema({
                task: task,
                userId: user
            });
            const docTodo = await todoCreate.save();
            console.log(docTodo);
            return response.json(docTodo);
        } catch (err) {
            console.log('Ошибка при создании заметки: ' + err);
            return response.status(500).json({
                message: 'Ошибка при создании заметки',
            });
        }
    }
}

module.exports = new Todo();