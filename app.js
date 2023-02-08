const express = require("express");
const User = require("./components/user/user.controller");
const regValidation = require('./validations/auth');
const checkAuth = require('./components/user/middleware/checkAuth');
const Todo = require("./components/todo/todo.controller");
const { SingletonInstance } = require('./mongoose.client');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

SingletonInstance.getMongooseConnect();
app.use(express.json());

app.get('/', (request, response) => {
    response.send('<h2>Server response : OK</h2>');
});
app.post('/auth/login', User.authUser);

app.post('/auth/register', regValidation, User.addUser);

app.get('/auth/me', checkAuth, User.meRoom);

app.get('/myTodoList', checkAuth, Todo.getListCase);

app.post('/createTodo', checkAuth, Todo.createTodo);

app.use((request, response) => {
    return response.status(404).send('<h2> Error: 404 </h2>');
});

app.listen(PORT, (err) => {
    if (err) {
        console.log('ERROR: ' + err);
    }
    console.log(`port: ${PORT} | server start: http://localhost:${PORT}`);
});