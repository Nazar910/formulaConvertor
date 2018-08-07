'use strict';
const jwt = require('jsonwebtoken');

const repository = require('../repositories/user');

const serializer = require('../serializers/user');

async function createUser (req, res) {
    try {
        const { data: userBody } = req.body;

        if (!userBody) {
            return res.json({
                error: ['Userbody is undefined!']
            });
        }

        const user = await repository.createUser(userBody.attributes);

        const result = {
            data: serializer.serializeData(user)
        };

        res.json(result);
    } catch (e) {
        res.json({
            error: [e.message]
        });
    }
}

async function updateUser (req, res) {
    try {
        const { data: userBody } = req.body;

        const userId = req.params.userId;

        if (!userBody) {
            return res.json({
                error: ['Userbody is undefined!']
            });
        }

        const user = await repository.updateUser(userId, userBody.attributes);

        const result = {
            data: serializer.serializeData(user)
        };

        res.json(result);
    } catch (e) {
        res.json({
            error: [e.message]
        });
    }
}

async function deleteUser (req, res) {
    try {
        const userId = req.params.userId;

        await repository.deleteUser(userId);

        res.json({
            deleted: true
        });
    } catch (e) {
        res.json({
            error: [e.message]
        });
    }
}

async function authenticateUser (req, res) {
    try {
        const { email, password } = req.body;

        const user = await repository.authenticateUser(email, password);

        if (user.error) {
            return res.json(user.error);
        }

        const token = jwt.sign(user, process.env.SECRET, {
            expiresIn: 604800
        });

        res.json({
            success: true,
            token: 'JWT ' + token,
            user: {
                id: user._id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                company: user.company
            }
        });
    } catch (e) {
        res.json({
            error: [e.message]
        });
    }
}

module.exports = {
    createUser,
    updateUser,
    authenticateUser,
    deleteUser
};
