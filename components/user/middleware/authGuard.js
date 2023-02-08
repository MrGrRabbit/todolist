const jwt = require('jsonwebtoken');
require('dotenv').config();

const privateKey = process.env.PRIVATE_KEY;

exports.authGuard = (request, response, next) => {
    const token = (request.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, privateKey);
            request.userId = decoded._id;

            next();
        } catch (error) {
            return response.status(403).json({
                message: 'Нет доступа',
            });
        }
    } else {
        return response.status(403).json({
            message: 'Нет доступа',
        });
    }
};
