'use strict';
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const repository = require('../repositories/user');

const serializer = require('../serializers/user');

async function createUser(req, res) {
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
        })
    }
}

async function updateUser(req, res) {
    try {
        const { data: userBody } = req.body;

        const userId = req.params.userId;

        const user = await repository.updateUser(userId, userBody.attributes);

        const result = {
            data: serializer.serializeData(user)
        };

        res.json(result);
    } catch (e) {
        res.json({
            error: [e.message]
        })
    }
}

async function authenticateUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findByEmail(email);

        if (!user) {
            return res.json({
                error: 'User with such email not found!',
                success: false
            });
        }

        const validPassword = await user.isValidPassword(password);

        if (!validPassword) {
            return res.json({
                error: 'Password or email is not valid!',
                success: false
            });
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
        })
    } catch (e) {
        res.json({
            error: [e.message]
        })
    }
}

module.exports = {
    createUser,
    updateUser,
    authenticateUser
};
