'use strict';
const _ = require('lodash');

function serializeUser(userBody) {
    const props = ['name', 'lastName', 'email', 'company', '_id'];
    const attributes = _.pick(userBody, props);

    return {
        type: 'user',
        id: userBody._id,
        attributes
    }
}

module.exports.serializeData = serializeUser;
