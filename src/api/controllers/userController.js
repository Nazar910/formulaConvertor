const config = require('../../../config');
const jwt = require('jsonwebtoken');
const { middleWarifyAsync } = require('../middleware');
const repository = require('../repositories/user');
const serializer = require('../serializers/user');
const logger = require('../logger');
const { BadRequest } = require('../errors');

async function createUser (req, res) {
    logger.info('In the /api/users POST');
    const { data: userBody } = req.body;
    logger.debug('User body is', { userBody });

    if (!userBody) {
        logger.error('User body is not provided');
        throw new BadRequest('You should pass valid user data');
    }

    const user = await repository.createUser(userBody.attributes);

    res.data = serializer.serializeData(user);
    res.statusCode = 201;
    logger.debug('Successfully created user', {
        data: res.data,
        code: res.statusCode
    });
}

async function updateUser (req, res) {
    logger.info('In the /api/users PATCH');
    const { data: userBody } = req.body;

    const userId = req.params.userId;

    if (!userBody) {
        logger.error('User body is not provided');
        throw new BadRequest('You should pass valid user data');
    }

    const user = await repository.updateUser(userId, userBody.attributes);

    res.data = serializer.serializeData(user);
    res.statusCode = 200;
}

async function deleteUser (req, res) {
    const userId = req.params.userId;
    logger.info('/api/users/:userId DELETE', {userId});

    await repository.deleteUser(userId);

    res.data = {};
    res.statusCode = 204;
}

async function authenticateUser (req, res) {
    logger.info('In the /api/user/authenticate');
    const { email, password } = req.body;

    const user = await repository.authenticateUser(email, password);

    const userObj = user.toObject();
    const token = jwt.sign(userObj, config.get('JWT_SECRET'), {
        expiresIn: 604800
    });

    res.data = {
        success: true,
        token: 'bearer ' + token,
        user: {
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            company: user.company
        }
    };
    res.statusCode = 200;
}

module.exports = {
    createUser: middleWarifyAsync(createUser),
    updateUser: middleWarifyAsync(updateUser),
    authenticateUser: middleWarifyAsync(authenticateUser),
    deleteUser: middleWarifyAsync(deleteUser)
};
