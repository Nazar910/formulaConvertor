'use strict';
const User = require('../models/user');

async function createUser(userBody) {
    const user = new User(userBody);

    await user.hashPassword();
    return user.save()
}

module.exports.createUser = createUser;
