const config = require('../../../config');
const request = require('supertest')(`http://localhost:${config.get('API_PORT')}`);
const _ = require('lodash');
const { expect } = require('chai');

const helpers = require('../helpers');

describe('users', () => {
    describe('POST', () => {
        describe('with valid userBody', () => {
            afterEach(async () => {
                await helpers.dropCollections(['User']);
            });
            it('should create a user', async () => {
                const reqBody = {
                    data: {
                        type: 'user',
                        attributes: {
                            name: 'Name',
                            lastName: 'lastName',
                            email: 'email@example.com',
                            password: 'qwerty',
                            company: 'some'
                        }
                    }
                };

                const { body: actualData } = await request
                    .post('/api/users/')
                    .send(reqBody)
                    .expect(201);

                expect(actualData.data.type).to.equal('user');

                const attributes = _.omit(actualData.data.attributes, ['_id']);
                const expectedAttributes = _.omit(reqBody.data.attributes, ['password']);

                expect(attributes).to.deep.equal(expectedAttributes);
            });
        });

        describe('with undefined userBody', () => {
            it('should cause an error', async () => {
                const { body } = await request
                    .post('/api/users/')
                    .expect(400);

                expect(body).to.deep.equal({
                    errors: [{
                        title: 'Bad request',
                        detail: 'You should pass valid user data',
                        code: 400,
                        status: 400
                    }]
                });
            });
        });
    });

    describe('PATCH', () => {
        let user;
        let token;
        beforeEach(async () => {
            const email = 'example@example.com';
            const password = 'qwerty';

            const userBody = {
                name: 'Name',
                lastName: 'lastName',
                email,
                password,
                company: 'some'
            };

            user = await helpers.ensureUser(userBody);

            const { body } = await request
                .post('/api/users/authenticate')
                .send({email, password})
                .expect(200);

            token = body.data.token;
        });

        afterEach(() => helpers.deleteUserById(user._id));

        describe('with valid userBody', () => {
            it('should update a user', async () => {
                const reqBody = {
                    data: {
                        type: 'user',
                        attributes: {
                            name: 'NewName',
                            email: 'newEmail@example.com'
                        }
                    }
                };
                const { body: actualData } = await request
                    .patch(`/api/users/${user._id}`)
                    .set({Authorization: token})
                    .send(reqBody)
                    .expect(200);

                expect(actualData.data.type).to.equal('user');

                const attributes = _.omit(actualData.data.attributes, ['_id']);

                expect(attributes).to.deep.equal({
                    name: 'NewName',
                    lastName: 'lastName',
                    email: 'newEmail@example.com',
                    company: 'some'
                });
            });
        });

        describe('with undefined userBody', () => {
            it('should cause an error', async () => {
                const { body } = await request
                    .patch(`/api/users/${user._id}`)
                    .set({Authorization: token})
                    .expect(400);

                expect(body).to.deep.equal({
                    errors: [{
                        title: 'Bad request',
                        detail: 'You should pass valid user data',
                        code: 400,
                        status: 400
                    }]
                });
            });
        });
    });

    describe('DELETE', () => {
        let user;
        let token;
        let formula;
        beforeEach(async () => {
            const email = 'example@example.com';
            const password = 'qwerty';

            const userBody = {
                name: 'Name',
                lastName: 'lastName',
                email,
                password,
                company: 'some'
            };

            user = await helpers.ensureUser(userBody);

            const formulaBody = {
                body: 'pow(x,2)',
                classicView: 'x<sup>2</sup>',
                language: 'c',
                userId: user._id
            };

            formula = await helpers.ensureFormula(formulaBody);

            const { body } = await request
                .post('/api/users/authenticate')
                .send({email, password})
                .expect(200);

            token = body.data.token;
        });

        describe('with valid id', () => {
            it('should delete a user', async () => {
                await request
                    .delete(`/api/users/${user._id}`)
                    .set({Authorization: token})
                    .expect(204);

                const deletedUser = await helpers.findUser(user._id);
                expect(deletedUser).to.be.equal(null);
                const formulaId = formula._id.toString();
                const deletedFormula = await helpers.findFormula(formulaId);
                expect(deletedFormula).to.be.equal(null);
            });
        });
    });
});
