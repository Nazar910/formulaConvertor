const User = require('../models/user');
const _ = require('lodash');

async function createUser(userBody) {
  const user = new User(
    _.pick(userBody, ['email', 'name', 'lastName', 'password', 'company']));

  await user.save();
}

async function updateUser(userBody) {
  const user = await User.findOne({ email: userBody.email });

  const userProperties
  = _.pick(userBody, ['email', 'name', 'lastName', 'password', 'company']);

  _.mapKeys(userProperties, (value, key) => user[key] = value);

  await user.save();
}

async function deleteUser({ email }) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('There is no user with such email');
  }

  await user.remove();
}

module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
