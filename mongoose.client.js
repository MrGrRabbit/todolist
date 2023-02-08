require('dotenv').config();
const mongoose = require('mongoose');
//const connectDB = process.env.CONNECT;
/**
 * @class Singleton
 * @constructor
 * @param {string} connectStr - string for connection mongodb
 * @description SingleTon for mongoose client
 */
class Singleton {
    constructor(connectStr) {
        this.connectStr = connectStr;
    }
    getMongooseConnect() {
        mongoose
            .connect(this.connectStr)
            .then(() => console.log('Connect DB'))
            .catch((err) => console.log('DB connect error', err));
    }
}

const SingletonInstance = new Singleton(process.env.CONNECT);
Object.freeze(SingletonInstance);

module.exports = { SingletonInstance };
