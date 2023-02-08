const { UserSchema } = require('./user.model');
const mongoose = require('mongoose');
const User = mongoose.model('User', UserSchema);

class UserRepository {
    async addUserRepo(email, password) {
        const docUser = await new User({
            email: email,
            passwordHash: password,
        });
        const user = docUser.save();
        return user;
    }

    async findUser(email) {
        const userEmail = await User.findOne({ email: email });
        return userEmail;
    }

    async findUserId(userId) {
        const user = await User.findById(userId);
        return user;
    }
}

module.exports = new UserRepository();
