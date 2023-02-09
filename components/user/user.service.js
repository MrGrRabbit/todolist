require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { addUserRepo, findUser, findUserId } = require('./user.repo');
const privateKey = process.env.PRIVATE_KEY;

class UserService {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    async addUserService(email, password) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const user = await addUserRepo(email, passwordHash);
        console.log(user);
        const token = jwt.sign(
            {
                _id: user._id,
            },
            privateKey,
            {
                expiresIn: '900s',
            }
        );
        user._doc['token'] = token;
        return user;
    }
    async authUserService(email, password) {
        const user = await findUser(email);

        if (!user) {
            return response.status(400).json({
                message: 'Неверный логин или пароль',
            });
        }

        const isValidPass = await bcrypt.compare(password, user._doc.passwordHash);
        if (!isValidPass) {
            return response.status(400).json({
                message: 'Неверный логин или пароль',
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            privateKey,
            {
                expiresIn: '900s',
            }
        );
        user._doc['token'] = token;
        return user;
    }
    async meRoomService(userId) {
        const user = await findUserId(userId);

        console.log(user);
        if (!user) {
            return response.status(403).json({
                message: 'Нет доступа',
            });
        }
        const { passwordHash, ...userData } = user._doc;
        return userData;
    }
}

module.exports = new UserService();
