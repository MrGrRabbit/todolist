const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { addUserRepo, findUser, findUserId } = require('./user.repo');
const { UserSchema } = require("./user.model");

class User {
    addUser = async (request, response, next) => {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(400).json(errors.array());
            }

            const email = request.body.email;
            //----------------------------------------------
            const password = request.body.password;
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);
            //----------------------------------------------
            const user = await addUserRepo(email, passwordHash);
            console.log(user);
            const token = jwt.sign({
                _id: user._id,
            }, '1bsmt9eW',
                {
                    expiresIn: '900s',
                });

            response.json({
                ...user._doc,
                token
            });
        } catch (err) {
            console.log('Ошибка регистрации: ' + err);
            return response.status(500).json({
                message: 'Ошибка при регистрации',
            });
        }
    }

    authUser = async (request, response) => {
        try {
            const email = request.body.email
            const user = await findUser(email);

            if (!user) {
                return response.status(400).json({
                    message: 'Неверный логин или пароль',
                });
            }

            const isValidPass = await bcrypt.compare(request.body.password, user._doc.passwordHash);
            if (!isValidPass) {
                return response.status(400).json({
                    message: 'Неверный логин или пароль',
                });
            }
            //next();
            const token = jwt.sign({
                _id: user._id,
            }, '1bsmt9eW',
                {
                    expiresIn: '900s',
                });
            return response.json({
                ...user._doc,
                token
            });

        } catch (err) {
            console.log(err);
            return response.status(401).json({
                message: 'Ошибка при авторизации',
            });
        }
    }
    meRoom = async (request, response) => {
        try {
            const user = await findUserId(request.userId);

            console.log(user);
            if (!user) {
                return response.status(403).json({
                    message: 'Нет доступа',
                });
            }
            const {passwordHash, ...userData} = user._doc;
            response.json(userData);
            
        } catch (error) {
            console.log('Ошибка: ', error);
        }
    }
}

module.exports = new User();