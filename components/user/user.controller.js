const { validationResult } = require('express-validator');
const { addUserService, authUserService, meRoomService } = require('./user.service');
require('dotenv').config();

class User {
    addUser = async (request, response) => {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(400).json(errors.array());
            }

            const { email, password } = request.body;
            const user = await addUserService(email, password);
            response.json({
                ...user._doc,
            });
        } catch (err) {
            console.log('Ошибка регистрации: ' + err);
            return response.status(500).json({
                message: 'Ошибка при регистрации',
            });
        }
    };

    authUser = async (request, response) => {
        try {
            const { email, password } = request.body;
            const user = await authUserService(email, password);
            return response.json({
                ...user._doc,
            });
        } catch (err) {
            console.log(err);
            return response.status(401).json({
                message: 'Ошибка при авторизации',
            });
        }
    };

    meRoom = async (request, response) => {
        try {
            const userData = await meRoomService(request.userId);
            response.json(userData);
        } catch (error) {
            console.log('Ошибка: ', error);
        }
    };
}

module.exports = new User();
