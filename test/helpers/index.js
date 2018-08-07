const { main: startApi } = require('../api');
const User = require('../api/models/user');
const Formula = require('../api/models/formula');

async function ensureUser (userBody) {
    const user = new User(userBody);
    await user.hashPassword();

    return user.save();
}

async function deleteUserById (userId) {
    const user = await User.findById(userId);

    return user.remove();
}

function ensureFormula (formulaBody) {
    const formula = new Formula(formulaBody);
    return formula.save();
}

function findFormula (_id) {
    return Formula.findById(_id);
}

function findUser (_id) {
    return User.findById(_id);
}

async function ensureApi () {
    await startApi();
}

async function dropCollections () {
    if (process.env.NODE_ENV !== 'test') {
        throw new Error('Will not drop collection until in test env');
    }

    await User.remove({});
    await Formula.remove({});
}

module.exports = {
    ensureUser,
    ensureFormula,
    findFormula,
    deleteUserById,
    findUser,
    ensureApi,
    dropCollections
};
