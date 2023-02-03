const { UserSchema } = require("./user.model");
const mongoose = require("mongoose");
// Сделать в качестве методов БД
const User = mongoose.model("User", UserSchema);

function addUserRepo(email, password) {
    const docUser = new User({
        email: email,
        passwordHash: password
    });
    const user = docUser.save();
    return user;
}

function findUser(email) {
    const userEmail = User.findOne({ email: email });
    return userEmail;
}

function findUserId(userId) {
    const user = User.findById(userId);
    return user;
}

module.exports = { addUserRepo, findUser, findUserId };