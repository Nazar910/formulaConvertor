const User = require('../models/user');
const _ = require('lodash');
const logger = require('../logger');
const { Unauthorized } = require('../errors');

async function createUser (userBody) {
    const user = new User(userBody);

    await user.hashPassword();
    return user.save();
}

async function updateUser (userId, userBody) {
    const user = await User.findById(userId);

    const userProperties =
        _.pick(userBody, ['email', 'name', 'lastName', 'password', 'company']);

    Object.assign(user, userProperties);

    return user.save();
}

async function deleteUser (userId) {
    return User.deleteById(userId);
}

async function authenticateUser (email, password) {
    const user = await User.findByEmail(email);

    if (!user) {
        logger.error('User with such email not found!');
        throw new Unauthorized('User with such email not found!');
    }

    const validPassword = await user.isValidPassword(password);

    if (!validPassword) {
        logger.error('Password or email is not valid!');
        throw new Unauthorized('Password or email is not valid!');
    }

    return user;
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    authenticateUser
};
