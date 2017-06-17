'use strict';

const serializer = require('../../serializers/user');
const mongoose = require('mongoose');
const _ = require('lodash');

const expect = require('chai').expect;

describe('userSerializer', () => {

    it('should serialize userBody to json api format', () => {

        const _id = mongoose.Types.ObjectId();
        const userBody = {
            _id,
            name: 'John',
            lastName: 'Smith',
            company: 'Example inc.',
            email: 'john.smith@example.com',
            password: 'secret_password'
        };

        const actual = serializer.serializeData(userBody);

        expect(actual).to.deep.equal({
            data: {
                id: _id,
                type: 'user',
                attributes: _.omit(userBody, ['password'])
            }
        });
    })

});
