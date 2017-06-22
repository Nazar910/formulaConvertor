'use strict';
const User = require('../models/user');
const _ = require('lodash');

async function createUser(userBody) {
    const user = new User(userBody);

    await user.hashPassword();
    return user.save()
}

async function updateUser(userId, userBody) {
    const user = await User.findById(userId);

    const userProperties
        = _.pick(userBody, ['email', 'name', 'lastName', 'password', 'company']);

    _.mapKeys(userProperties, (value, key) => user[key] = value);

    return user.save();
}

module.exports = {
    createUser,
    updateUser
};
