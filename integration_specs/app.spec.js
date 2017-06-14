'use strict';
describe('app', () => {

    const expect = require('chai').expect;
    const axios = require('axios');
    const mongoose = require('mongoose');
    const _ = require('lodash');

    let app;
    before(() => {

        process.env.MONGO_URI = 'mongodb://localhost/test_db';
        process.env.API_PORT = 3300;
        process.env.SECRET='test';
        app = require('../index');

    });

    after(() => {
        mongoose.connection.db.dropDatabase();
    });

    describe('users', () => {

        describe('create', () => {

            describe('with valid userBody', () => {

                it('should create a user', async () => {

                    try {
                        const userBody = {
                            user: {
                                name: 'Name',
                                lastName: 'lastName',
                                email: 'email@example.com',
                                password: 'qwerty',
                                company: 'some'
                            }
                        };
                        const resp = await axios.post('http://localhost:3300/api/users/', userBody);

                        const actualData = _.omit(resp.data, ['__v', '_id', 'password']);
                        expect(actualData).to.deep.equal({
                            name: 'Name',
                            lastName: 'lastName',
                            email: 'email@example.com',
                            company: 'some'
                        });
                    } catch (e) {
                        console.error(e);
                        throw e;
                    }

                });

            });

            describe('with undefined userBody', () => {

                it('should cause an error', async () => {

                    try {
                        const userBody = {};
                        const resp = await axios.post('http://localhost:3300/api/users/', userBody);

                        expect(resp.data).to.deep.equal({
                            error: ['Userbody is undefined!']
                        });
                    } catch (e) {
                        throw e;
                    }

                });

            });

        })

    });

    describe('formulas', () => {

        const Formula = require('../models/formula');

        let user;
        beforeEach(async () => {

            try {
                const userBody = {
                    user: {
                        name: 'Name',
                        lastName: 'lastName',
                        email: 'email@example.com',
                        password: 'qwerty',
                        company: 'some'
                    }
                };
                const resp = await axios.post('http://localhost:3300/api/users/', userBody);

                user = resp.data;

            } catch (e) {
                console.error(e);
                throw e;
            }

        });

        describe('create', () => {



            describe('with valid body', () => {

                it('should create a formula', async () => {

                    try {
                        const formulaBody = {
                            formula: {
                                body: 'x^2',
                                classicView: 'x<sup>2</sup>',
                                language: Formula.PASCAL
                            }
                        };
                        const resp = await axios.post(`http://localhost:3300/api/formulas/${user._id}`, formulaBody);

                        const actualData = _.omit(resp.data.formula, ['__v', '_id', 'userId', 'createdAt', 'updatedAt']);
                        const actualUserId = resp.data.formula.userId;

                        expect(actualData).to.deep.equal(formulaBody.formula);
                        expect(actualUserId).to.equal(user._id);

                    } catch (e) {
                        console.error(e);
                        throw e;
                    }

                });

            });

            xdescribe('with undefined userBody', () => {

                it('should cause an error', async () => {

                    try {
                        const userBody = {};
                        const resp = await axios.post('http://localhost:3300/api/users/', userBody);

                        expect(resp.data).to.deep.equal({
                            error: ['Userbody is undefined!']
                        });
                    } catch (e) {
                        throw e;
                    }

                });

            });

        })

    });

});
