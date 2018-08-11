const { main: startApi } = require('../../src/api');
const models = require('../../src/api/models');
const {
    User, Formula
} = models;

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

async function dropCollections (collections) {
    if (process.env.NODE_ENV !== 'test') {
        throw new Error('Will not drop collection until in test env');
    }

    if (collections && Array.isArray(collections)) {
        return Promise.all(collections.map(c => models[c].remove({})));
    }

    return Promise.all(Object.keys(models).map(c => models[c].remove({})));
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
