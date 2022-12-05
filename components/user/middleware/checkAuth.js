const jwt = require('jsonwebtoken');
module.exports = (request, response, next) => {
    const token = (request.headers.authorization || '').replace(/Bearer\s?/, '');
    
    if (token) {
        try {
            const decoded = jwt.verify(token, '1bsmt9eW');
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

}
